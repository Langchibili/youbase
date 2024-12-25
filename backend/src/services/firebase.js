// const admin = require('firebase-admin');

// const initializeFirebaseAdmin = async () => {
//   try {
//     // Fetch the service account from the FirebaseFcmConfig content type
//     const firebaseConfig = await strapi.db.query('api::firebase-fcm-config.firebase-fcm-config').findOne();

//     if (!firebaseConfig || !firebaseConfig.serviceAccount) {
//       throw new Error('Service account not found in FirebaseFcmConfig.');
//     }

//     // Initialize Firebase Admin
//     admin.initializeApp({
//       credential: admin.credential.cert(
//         JSON.parse(firebaseConfig.serviceAccount) // Parse the serviceAccount JSON string
//       ),
//     });

//     console.log('Firebase Admin initialized successfully.');
//   } catch (error) {
//     console.error('Error initializing Firebase Admin:', error);
//     throw error;
//   }
// };

// module.exports = { admin, initializeFirebaseAdmin };

const admin = require('firebase-admin');

let firebaseInitialized = false;

const initializeFirebaseAdmin = async () => {
  if (!firebaseInitialized) {
    try {
      const firebaseConfig = await strapi.db.query('api::firebase-fcm-config.firebase-fcm-config').findOne();

      if (!firebaseConfig || !firebaseConfig.serviceAccount) {
        console.error("firebaseconfig not found")
        return 
      }
      // Initialize Firebase Admin
      admin.initializeApp({
        credential: admin.credential.cert(
          firebaseConfig.serviceAccount // Parse the serviceAccount JSON string
        ),
      });

      firebaseInitialized = true;
      console.log('Firebase Admin initialized successfully.');
    } catch (error) {
      console.error('Error initializing Firebase Admin:', error);
      return
      throw error;
    }
  }
};

module.exports = { admin, initializeFirebaseAdmin };
