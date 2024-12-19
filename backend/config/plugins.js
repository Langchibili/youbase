module.exports = ({env}) => ({
    'users-permissions': {
      config: {
        jwt: {
          expiresIn: '100y',
        }
      }
    },
    upload: {
      config:{
        provider: "aws-s3",
        providerOptions: {
          accessKeyId: env("AWS_ACCESS_KEY_ID"),
          secretAccessKey: env("AWS_SECRET_ACCESS_KEY"),
          region: env("AWS_REGION"),
          params: {
            Bucket: env("AWS_BUCKET_NAME"),
          },
          baseUrl: 'https://youbase-media-files-langtechdev.s3.eu-central-1.amazonaws.com',
          sizeLimit: 256 * 1024 * 1024, // Keep overall request limit at 256MB
          breakpoints: {
            xlarge: 1920,
            large: 1000,
            medium: 750,
            small: 500,
            xsmall: 64
          }
        }
      },
      enabled:true
    },
    // 'strapi-plugin-fcm': { // faulty plugin so not gonna use it
    //     enabled: true,
    //     resolve: './src/plugins/strapi-plugin-fcm' // path to plugin folder
    // }, 
    // upload: {
    //     provider: "local",
    //     providerOptions: {
    //       destination: "./public/uploads",
    //     },
    //     name: "strapi::body",
    //     config: {
    //       formLimit: "256mb", // modify form body
    //       jsonLimit: "256mb", // modify JSON body
    //       textLimit: "256mb", // modify text body
    //       formidable: {
    //         maxFileSize: 10 * 1024 * 1024, // Set to 10MB for video uploads
    //       },
    //       sizeLimit: 256 * 1024 * 1024, // Keep overall request limit at 256MB
    //       breakpoints: {
    //         xlarge: 1920,
    //         large: 1000,
    //         medium: 750,
    //         small: 500,
    //         xsmall: 64
    //       }
    //     }
    //   }   
})
