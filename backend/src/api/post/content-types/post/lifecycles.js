'use strict';
const  { transcodeVideo,generateThumbnail }  = require('../../../../services/media-convert')
module.exports = {
    async afterUpdate(event) {
        const { result, params } = event;
        const { data } = params;
       
        if(!result.id){
            return
        }
        const getMedia = async () => {
            return await strapi.db.query("api::post.post").findOne({
                where: { id: result.id },
                populate: ['media']
            });
        };
        const { media,extra_payload } = await getMedia()
        
        media.forEach(async (file) => { // transcode all  the files inside the videos array
            const formats = file.formats // get the existing formats, if they do exist, do not create a new set of transcoding jobs
            if(formats){
                return // no need for processing if already processed
            }
            console.log("extra_payload",extra_payload)
            const videoMeta = extra_payload.media.videos? extra_payload.media.videos[file.id.toString()] : null
            if(!videoMeta){
                return
            }
            const videoWidth = videoMeta.width
            const videoHeight = videoMeta.height
            const videoUrl = file.url
            const videoS3URI = file.url.replace(process.env.AWS_S3_FILES_PATH,process.env.AWS_S3_INPUT_FILES_URI)
            try {
                const thumbnailJob = await generateThumbnail(videoWidth, videoHeight, videoUrl, process.env.AWS_OUTPUT_BUCKET_NAME)
                const videoJobs = await transcodeVideo(videoWidth, videoHeight, videoUrl, process.env.AWS_OUTPUT_BUCKET_NAME)
                console.log('thumbnail Job Created:', thumbnailJob)
                console.log('MediaConvert Jobs Created:', videoJobs)
                // ctx.send({ message: 'Transcoding job submitted successfully!' })
              } catch (error) {
                // ctx.throw(500, 'Error creating MediaConvert job')
                console.log(500, 'Error creating MediaConvert job')
              }
            console.log(videoS3URI)
        })
        
        console.log('the results with media:', media)
        console.log('the params are:', params)
    },
}

