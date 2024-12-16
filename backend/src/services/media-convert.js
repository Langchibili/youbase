const AWS = require('aws-sdk')

AWS.config.update({
  region: process.env.AWS_REGION, // e.g., 'us-east-1'
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

const mediaConvert = new AWS.MediaConvert({
  endpoint: process.env.MediaConvertEndpoint, // MediaConvert endpoint
})

// List of standard resolutions
const resolutions = [1080, 720, 480, 360, 240]

/**
 * Ensures dimensions are even numbers.
 * @param {number} width - Original width.
 * @param {number} height - Original height.
 * @returns {object} - Dimensions with even width and height.
 */
const ensureEvenDimensions = (width, height) => ({
  Width: width % 2 === 0 ? width : width - 1,
  Height: height % 2 === 0 ? height : height - 1,
})

/**
 * Determines if the video is portrait or landscape and validates the aspect ratio.
 * @param {number} width - Video width.
 * @param {number} height - Video height.
 * @returns {object} - The video's orientation ('landscape' or 'portrait') and height resolution.
 */
const getVideoOrientationAndResolution = (width, height) => {
  const ratio = width / height
  if (Math.abs(ratio - 16 / 9) < 0.01) {
    return { orientation: 'landscape', resolution: height }
  }
  if (Math.abs(ratio - 9 / 16) < 0.01) {
    return { orientation: 'portrait', resolution: height }
  }
  // otherwise we shall assume it's a landscape
  return { orientation: 'landscape', resolution: height }
 // throw new Error('Unsupported aspect ratio. Only 16:9 or 9:16 videos are supported.')
}

/**
 * Generates video dimensions based on resolution and orientation.
 * @param {number} resolution - Target resolution height (e.g., 1080, 720, etc.).
 * @param {string} orientation - Video orientation ('landscape' or 'portrait').
 * @returns {object} - Width and height of the video.
 */
const getVideoDimensions = (resolution, orientation) => {
  const rawDimensions =
    orientation === 'landscape'
      ? { Width: Math.round((resolution / 9) * 16), Height: resolution }
      : { Width: resolution, Height: Math.round((resolution / 9) * 16) }

  return ensureEvenDimensions(rawDimensions.Width, rawDimensions.Height)
}

/**
 * Generates audio settings based on resolution.
 * @param {number} resolution - Target resolution height (e.g., 1080, 720, etc.).
 * @returns {object} - Audio codec settings.
 */
const getAudioSettings = (resolution) => {
  const bitrates = {
    1080: 192000, // High quality
    720: 128000, // Medium quality
    480: 96000, // Low quality
    360: 64000, // Very low quality
    240: 64000, // Minimal quality
  }
  const bitrate = Math.max(64000, Math.min(bitrates[resolution] || 96000, 576000)) // Clamp within valid range
  return {
    Codec: 'AAC',
    SampleRate: 48000,
    Bitrate: bitrate,
    Channels: 2,
  }
}

const videoBitrates = {
  1080: 5000000,
  720: 3000000,
  480: 1500000,
  360: 1000000,
  240: 600000,
}

/**
 * Transcodes the video into lower resolutions and creates MediaConvert jobs.
 * @param {number} width - Video width.
 * @param {number} height - Video height.
 * @param {string} filePath - S3 URL of the input file.
 * @param {string} outputBucket - S3 bucket for output.
 * @returns {Promise<object>} - Object containing job IDs, their resolutions, and the default resolution.
 */
const transcodeVideo = async (width, height, filePath, outputBucket) => {
  try {
    const { orientation, resolution: videoResolution } = getVideoOrientationAndResolution(width, height)
    const lowerResolutions = resolutions.filter((res) => res < videoResolution)

    const jobIds = []

    for (const resolution of lowerResolutions) {
      const { Width, Height } = getVideoDimensions(resolution, orientation)
      const audioSettings = getAudioSettings(resolution)

      const params = {
        Role: process.env.AWS_MEDIACONVERT_ROLE_ARN,
        Settings: {
          Inputs: [
            {
              FileInput: filePath,
              VideoSelector: {
                Rotate: 'AUTO', // Automatically correct orientation
              },
              AudioSelectors: {
                "Audio Selector 1": {
                  SelectorType: 'TRACK',
                  Tracks: [1], // Default to the first audio track
                },
              },
            },
          ],
          OutputGroups: [
            {
              Name: 'File Group',
              OutputGroupSettings: {
                Type: 'FILE_GROUP_SETTINGS',
                FileGroupSettings: {
                  Destination: `s3://${outputBucket}/`,
                },
              },
              Outputs: [
                {
                  VideoDescription: {
                    CodecSettings: {
                      Codec: 'H_264',
                      H264Settings: {
                        MaxBitrate: videoBitrates[resolution], // Set maximum bitrate dynamically
                        FramerateControl: 'INITIALIZE_FROM_SOURCE',
                        GopSize: 5, // Longer GOP size
                        RateControlMode: 'QVBR',
                        QvbrSettings: {
                          QvbrQualityLevel: 7, // Balanced quality and size
                        },
                      },
                    },
                    Width,
                    Height,
                    ScalingBehavior: 'DEFAULT',
                    // ScalerFilter: 'LANCZOS', // High-quality downscaling
                  },
                  AudioDescriptions: [
                    {
                      CodecSettings: {
                        Codec: audioSettings.Codec,
                        AacSettings: {
                          SampleRate: audioSettings.SampleRate,
                          Bitrate: audioSettings.Bitrate,
                          CodingMode: 'CODING_MODE_2_0',
                        },
                      },
                    },
                  ],
                  ContainerSettings: {
                    Container: 'MP4',
                  },
                  NameModifier: `_${resolution}p`,
                },
              ],
            },
          ],
        },
      }
      
      
      const response = await mediaConvert.createJob(params).promise()
      jobIds.push({ [response.Job.Id]: resolution })
    }

    return {
      jobIds,
      defaultFile: `${videoResolution}p_${orientation}`,
    }
  } catch (error) {
    console.error('Error creating MediaConvert jobs:', error)
    throw error
  }
}

const generateThumbnail = async (width, height, filePath, outputBucket, thumbnailTime = 10) => {
  try {
    // Determine orientation and resolution
    const { orientation } = getVideoOrientationAndResolution(width, height)
    const { Width, Height } = getVideoDimensions(480, orientation) // Default resolution is 480p

    const params = {
      Role: process.env.AWS_MEDIACONVERT_ROLE_ARN,
      Settings: {
        Inputs: [
          {
            FileInput: filePath,
            VideoSelector: {
              Rotate: 'AUTO', // Automatically correct orientation
            },
          },
        ],
        OutputGroups: [
          {
            Name: 'File Group',
            OutputGroupSettings: {
              Type: 'FILE_GROUP_SETTINGS',
              FileGroupSettings: {
                Destination: `s3://${outputBucket}/thumbnails/`,
              },
            },
            Outputs: [
              // Thumbnail output
              {
                VideoDescription: {
                  CodecSettings: {
                    Codec: 'FRAME_CAPTURE',
                    FrameCaptureSettings: {
                      FramerateNumerator: 1, // Capture one frame per second
                      FramerateDenominator: 1,
                      MaxCaptures: 1, // Capture only one frame
                      Quality: 50, // mid-quality thumbnail
                    },
                  },
                  Width,
                  Height,
                },
                ContainerSettings: {
                  Container: 'RAW', // RAW container outputs as .jpg or .png
                },
                NameModifier: `_thumbnail_${thumbnailTime}s`, // Thumbnail filename suffix
              },
              // Minimal video output to satisfy MediaConvert requirements
              {
                VideoDescription: {
                  CodecSettings: {
                    Codec: 'H_264',
                    H264Settings: {
                      MaxBitrate: 100000, // Low bitrate for minimal video output
                      RateControlMode: 'QVBR',
                      QvbrSettings: {
                        QvbrQualityLevel: 1, // Lowest quality
                      },
                    },
                  },
                  Width,
                  Height,
                },
                ContainerSettings: {
                  Container: 'MP4',
                },
                NameModifier: '_minimal',
              },
            ],
          },
        ],
        // TimecodeConfig: {
        //   Source: 'ZEROBASED', // Use zero-based timecode
        // },
      },
      AccelerationSettings: {
        Mode: 'DISABLED', // Adjust if hardware acceleration is available
      },
    }

    const response = await mediaConvert.createJob(params).promise()
    console.log('Thumbnail generation job created:', response.Job.Id)
    return response.Job.Id
  } catch (error) {
    console.error('Error creating MediaConvert thumbnail job:', error)
    throw error
  }
}

module.exports = { transcodeVideo,generateThumbnail }
