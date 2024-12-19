'use strict';
const  { transcodeVideo,generateThumbnail }  = require('../../../../services/media-convert')
module.exports = {
    async afterUpdate(event) {
        const { result, params } = event;
        const { data } = params;
       
        if(!result.id){
            return
        }
        if(result.type !== "video"){ // for now, we are only transcoding videos
           return
        }
        const getMedia = async () => {
            return await strapi.db.query("api::post.post").findOne({
                where: { id: result.id },
                populate: ['media']
            });
        };
       
        async function processMedia(media, extra_payload) {
            if (!Array.isArray(media)) {
              console.error('Media is not an array:', media)
              return
            }
          
            for (const file of media) {
              try {
                // Debugging: Log the file ID and formats
                console.log(`Processing file ID: ${file.id}, formats:`, file.formats)
          
                // Check if file already has formats
                if (file.formats) {
                  console.log(`Skipping file ID ${file.id}: Already formatted`)
                  continue
                }
          
                // Check video metadata
                const videoMeta = extra_payload.media.videos
                  ? extra_payload.media.videos[file.id.toString()]
                  : null
                if (!videoMeta) {
                  console.log(`Skipping file ID ${file.id}: No video metadata found`)
                  continue
                }
          
                // Extract metadata
                const { width: videoWidth, height: videoHeight } = videoMeta
                const videoUrl = file.url
                const videoS3URI = file.url.replace(
                  process.env.AWS_S3_FILES_PATH,
                  process.env.AWS_S3_INPUT_FILES_URI
                )
          
                console.log(`Processing file ID ${file.id}: Video S3 URI: ${videoS3URI}`)
          
                // Thumbnail generation
                const thumbnailJob = await generateThumbnail(
                  videoWidth,
                  videoHeight,
                  videoUrl,
                  process.env.AWS_OUTPUT_BUCKET_NAME
                )
                await strapi.db.query('api::media-convert-job.media-convert-job').create({
                  data: { jobId: thumbnailJob, uploadId: file.id, type: 'image' },
                })
                console.log(`Thumbnail Job Created for file ID ${file.id}:`, thumbnailJob)
          
                // Video transcoding
                const videoJobs = await transcodeVideo(
                  videoWidth,
                  videoHeight,
                  videoUrl,
                  process.env.AWS_OUTPUT_BUCKET_NAME
                )
                for (const jobId of videoJobs.jobIds) {
                  const resolution = 'res-' + Object.values(jobId)[0]
                  await strapi.db
                    .query('api::media-convert-job.media-convert-job')
                    .create({
                      data: {
                        jobId: Object.keys(jobId)[0],
                        resolution: resolution,
                        uploadId: file.id,
                        type: 'video',
                      },
                    })
                }
                console.log(`MediaConvert Jobs Created for file ID ${file.id}:`, videoJobs)
              } catch (error) {
                console.error(`Error processing file ID ${file.id}:`, error)
              }
            }
          }
          const { media,extra_payload } = await getMedia()
          processMedia(media, extra_payload)
          console.log(media)
          
        // for (const file of media) {
        //      // transcode all the files inside the videos array
        //     const formats = file.formats // get the existing formats, if they do exist, do not create a new set of transcoding jobs
        //     if (formats) {
        //         continue // skip processing if already formatted
        //     }
            
        //     const videoMeta = extra_payload.media.videos ? extra_payload.media.videos[file.id.toString()] : null
        //     if (!videoMeta) {
        //         continue // skip if no metadata exists for the video
        //     }
            
        //     const videoWidth = videoMeta.width
        //     const videoHeight = videoMeta.height
        //     const videoUrl = file.url
        //     const videoS3URI = file.url.replace(process.env.AWS_S3_FILES_PATH, process.env.AWS_S3_INPUT_FILES_URI)
        
        //     try {
        //         const thumbnailJob = await generateThumbnail(videoWidth, videoHeight, videoUrl, process.env.AWS_OUTPUT_BUCKET_NAME)
        //         await strapi.db.query("api::media-convert-job.media-convert-job").create({
        //             data: { jobId: thumbnailJob, uploadId: file.id, type: "image" }
        //         })
        
        //         const videoJobs = await transcodeVideo(videoWidth, videoHeight, videoUrl, process.env.AWS_OUTPUT_BUCKET_NAME)
        //         for (const jobId of videoJobs.jobIds) {
        //             const resolution = "res-" + Object.values(jobId)[0]
        //             await strapi.db.query("api::media-convert-job.media-convert-job").create({
        //                 data: { jobId: Object.keys(jobId)[0], resolution: resolution, uploadId: file.id, type: "video" }
        //             })
        //         }
        
        //         console.log('Thumbnail Job Created:', thumbnailJob)
        //         console.log('MediaConvert Jobs Created:', videoJobs)
        //     } catch (error) {
        //         console.error(500, 'Error creating MediaConvert job', error)
        //     }
        
        //     console.log(videoS3URI)
        // }
        
        
        // console.log('the results with media:', media)
        // console.log('the params are:', params)
    },
}

