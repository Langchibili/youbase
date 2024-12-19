'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap() {
    /*
       AWS SQS MESSAGES FOR FILE(VIDEOS) TRANSCODE JOBS MAINLY
    */
    const sqsService = require('./services/aws-sqs')
    // Start polling for SQS messages
    sqsService.startPolling(3000) // Adjust interval as needed
    console.log('AWS SQS polling started...')

    /* 
      FIREBASE INITITALIZATION ESPECIALLY FOR FCM(PUSH NOTIFICATIONS)
    */
    const { initializeFirebaseAdmin } = require('./services/firebase');
    await initializeFirebaseAdmin();  // initialize firebase
    global.firebaseAdmin = require('./services/firebase').admin; // add firebase to the global object for global access
    console.log('Firebase Admin is globally accessible.');
  }
}




