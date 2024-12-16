const AWS = require('aws-sdk')

// Configure AWS
AWS.config.update({ region: process.env.AWS_REGION }) // e.g., 'us-east-1'

// AWS SDK clients
const sqs = new AWS.SQS()

// SQS Queue URL
const queueUrl = process.env.SQS_QUEUE_URL // Example: 'https://sqs.us-east-1.amazonaws.com/123456789012/MediaConvertJobNotifications'

// Strapi reference
const Strapi = strapi

const mediaConvert = new AWS.MediaConvert({
  endpoint: process.env.MediaConvertEndpoint, // MediaConvert endpoint
})

// Initialize the S3 client
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

async function deleteFileFromS3(fileUrl) {
  try {
    // Extract the key from the file URL
    const bucketUrl = `https://${process.env.AWS_OUTPUT_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/`;
    const key = fileUrl.replace(bucketUrl, ''); // Remove bucket URL to get the key

    const params = {
      Bucket: process.env.AWS_OUTPUT_BUCKET_NAME,
      Key: key,
    };

    await s3.deleteObject(params).promise();
    console.log(`File deleted successfully from S3: ${key}`);
  } catch (error) {
    console.error('Error deleting file from S3:', error);
    throw error;
  }
}



async function processMessages() {
  try {
    const params = {
      QueueUrl: queueUrl,
      MaxNumberOfMessages: 10, // Batch size
      WaitTimeSeconds: 10, // Long polling
    }

    const data = await sqs.receiveMessage(params).promise()
    if (data.Messages) {
      for (const [index, message] of data.Messages.entries()) {
        try {
          const body = JSON.parse(message.Body)
          const { detail } = body

          // Log job ID and status from the message
          const job = await Strapi.db.query('api::media-convert-job.media-convert-job').findOne({
            where: { jobId: detail.jobId },
          })
          const upload = await Strapi.db.query('plugin::upload.file').findOne({
            where: { id: job.uploadId },
          })

          if (job.type === "image") {
            if (upload.previewUrl) {
              continue // means there is a thumbnail which exists already for this video, no need to do anything else
            }
          } else {
            if (upload.formats) {
              const resolution = job.resolution.replace('res-', '')
              if (upload.formats[resolution]) {
                continue // means this format already exists, no need to do anything else
              }
            }
          }

          // Get MediaConvert job details and obtain file details
          const jobDetails = await mediaConvert.getJob({ Id: detail.jobId }).promise()
          const outputDestination = jobDetails.Job.Settings.OutputGroups[0].OutputGroupSettings.FileGroupSettings?.Destination
          const inputFile = jobDetails.Job.Settings.Inputs[0].FileInput
          const nameModifier = jobDetails.Job.Settings.OutputGroups[0].Outputs[0].NameModifier || ''
          const inputFilePartArray = inputFile.split("/")
          let inputFilePartWithModifier = inputFilePartArray[inputFilePartArray.length - 1].replace(".", nameModifier + ".")
          let tempMP4FilePath = ""

          if (job.type === "image") { // means it's a thumbnail
            tempMP4FilePath = outputDestination.replace(process.env.AWS_S3_OUTPUT_FILES_URI, process.env.AWS_S3_OUTPUT_FILES_PATH) + inputFilePartArray[inputFilePartArray.length - 1].replace(".", "_minimal.") // the temporal file has a consistent nameModifier
            const inputFilePartWithModifierArray = inputFilePartWithModifier.split(".")
            inputFilePartWithModifier = inputFilePartWithModifierArray[0] + ".0000000.jpg" // so that the extension is a jpg
            // getting the file part of the temporal mp4 file created in making the thumbnail
          }
          const outputFilePath = outputDestination.replace(process.env.AWS_S3_OUTPUT_FILES_URI, process.env.AWS_S3_OUTPUT_FILES_PATH) + inputFilePartWithModifier
          if (job.type === "image") {
            await Strapi.db.query('plugin::upload.file').update({ where: { id: job.uploadId }, data: { previewUrl: outputFilePath } });
          } else {
            const resolution = job.resolution.replace('res-', '')
            console.log({[resolution]: outputFilePath})
            const currentFormats = upload.formats || {}; // Ensure formats is at least an empty object
            const updatedFormats = { ...currentFormats, [resolution]: outputFilePath };
            await Strapi.db.query('plugin::upload.file').update({ 
                where: { id: job.uploadId }, 
                data: { formats: updatedFormats } 
            });
            console.log('Existing formats:', currentFormats);
            console.log('Updated formats:', updatedFormats);
         }

          // Delete the processed message from the SQS queue
          await sqs.deleteMessage({QueueUrl: queueUrl,ReceiptHandle: message.ReceiptHandle,}).promise()
          if(job.type === "image"){
            console.log('the temp mp4 file path', tempMP4FilePath)
            deleteFileFromS3(tempMP4FilePath) // delete the temporal video file created during thumbnail generation
          }
          console.log('Message deleted from SQS.')
        } catch (messageError) {
          console.error('Error processing individual message:', messageError)
        }
      }
    } else {
      console.log('No messages received from SQS.')
    }
  } catch (error) {
    console.error('Error processing messages:', error)
  }
}


// Poll for messages at regular intervals
function startPolling(interval = 3000) {
  setInterval(processMessages, interval)
}

module.exports = {
  startPolling,
}
