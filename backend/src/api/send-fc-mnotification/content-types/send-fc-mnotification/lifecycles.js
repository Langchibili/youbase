'use strict';
const  { admin }  = require('../../../../services/firebase')
module.exports = {
    async afterCreate(event) {
        const { data } = event.params;
 
        // Access the global Firebase Admin instance
        const firebaseAdmin = global.firebaseAdmin;
        console.log('the firebase admin object', firebaseAdmin)
        
        const getDeviceIds = async (userIds) => {
            if (!Array.isArray(userIds) || userIds.length === 0) {
               console.log('Invalid userIds array provided');
               return []
            }
          
            // Query the users collection to fetch their notificationsDeviceId
            const users = await strapi.db.query('plugin::users-permissions.user').findMany({
              where: {
                id: {
                  $in: userIds, // Matches users with IDs in the provided array
                },
              },
              select: ['notificationsDeviceId'], // Select only the field you need
            });
          
            // Extract the notificationsDeviceId values and filter out null/undefined
            const deviceIds = users
              .map(user => user.notificationsDeviceId)
              .filter(id => id); // Remove null/undefined values
          
            return deviceIds;
        }
        const sendNotification = async (registrationToken, title, body, image, clickAction ) => {
            try {
              // Construct the message payload
              const message = {
                token: registrationToken,
                notification: {
                  title,
                  body,
                  image, // Optional: Firebase supports images in notifications
                },
                android: {
                  priority: 'high', // Set the priority to 'high'
                  notification: {
                    click_action: clickAction, // URL or intent for the notification click action
                  },
                },
                apns: {
                  payload: {
                    aps: {
                      category: clickAction, // iOS equivalent for click action
                      'content-available': 1,
                      alert: {
                        title,
                        body,
                      },
                    },
                  },
                  fcm_options: {
                    image, // Optional image for iOS notifications
                  },
                },
                webpush: {
                  notification: {
                    title,
                    body,
                    icon: image, // Web-specific image
                    click_action: clickAction, // URL to open when the notification is clicked
                  },
                },
              };
          
              // Send the notification using Firebase Admin SDK
              const response = await firebaseAdmin.messaging().send(message);
          
              console.log('Notification sent successfully:', response);
              return response;
            } catch (error) {
              console.error('Error sending notification:', error);
              throw error;
            }
        }
          
          
        const sendNotificationToMultipleDevices = async (deviceTokens, title, body, image, clickAction ) => {
            try {
              // Construct the message payload
              const message = {
                notification: {
                  title,
                  body,
                  image, // Optional: Include an image URL
                },
                android: {
                  priority: 'high', // Set high priority for Android
                  notification: {
                    click_action: clickAction, // URL or intent for Android
                  },
                },
                webpush: {
                  notification: {
                    title,
                    body,
                    icon: image, // Image for web notifications
                    click_action: clickAction, // URL for web
                  },
                },
                apns: {
                  payload: {
                    aps: {
                      alert: { title, body },
                      category: clickAction, // iOS category for click action
                      'content-available': 1,
                    },
                  },
                  fcm_options: {
                    image, // Image for iOS notifications
                  },
                },
                tokens: deviceTokens, // Array of device tokens
              };
          
              // Send the notification to multiple devices
              const response = await firebaseAdmin.messaging().sendMulticast(message);
          
              console.log('Multicast notification sent successfully:', response);
          
              // Check and log failed tokens
              if (response.failureCount > 0) {
                const failedTokens = response.responses
                  .map((resp, idx) => (!resp.success ? deviceTokens[idx] : null))
                  .filter((token) => token !== null);
          
                console.error('Failed tokens:', failedTokens);
              }
          
              return response;
            } catch (error) {
              console.error('Error sending multicast notification:', error);
              return
              throw error;
            }
          };
          
        const deviceIds = await getDeviceIds(data.targetUserIds) // get devideIds through a supplied array of userIds

        if(deviceIds.length === 0){ // if no devices per userids, why bother?
            return
        }
        if(deviceIds.length > 1){// send to multiple devices then
            sendNotificationToMultipleDevices(deviceIds,data.title, data.body, data.image_path, data.clickAction )
        }
        else{ // send to one, the only device id supplied
            sendNotification(deviceIds[0],data.title, data.body, data.image_path, data.clickAction )
        }
    },
}