const AWS = require('aws-sdk')

// Configure SQS
AWS.config.update({ region: process.env.AWS_REGION }) // e.g., 'us-east-1'
const sqs = new AWS.SQS()

// SQS Queue URL
const queueUrl = process.env.SQS_QUEUE_URL // Example: 'https://sqs.us-east-1.amazonaws.com/123456789012/MediaConvertJobNotifications'

// Function to process messages
async function processMessages() {
  try {
    const params = {
      QueueUrl: queueUrl,
      MaxNumberOfMessages: 10, // Batch size
      WaitTimeSeconds: 10, // Long polling
    }

    const data = await sqs.receiveMessage(params).promise()
    if (data.Messages) {
      for (const message of data.Messages) {
        const body = JSON.parse(message.Body)
        const {detail} = body

        // Handle the MediaConvert job status here
        console.log(`Job ID: ${detail.jobId}, Status: ${detail.status}`)

        // Example: Update database or post-processing logic
        // await strapi.entityService.update('api::job.job', detail.jobId, {
        //   data: { status: detail.status },
        // })

        // Delete the processed message from the queue
        await sqs.deleteMessage({
          QueueUrl: queueUrl,
          ReceiptHandle: message.ReceiptHandle,
        }).promise()
      }
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
