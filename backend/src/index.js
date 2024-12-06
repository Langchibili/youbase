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
    
    const sqsService = require('./services/aws-sqs')

    // Start polling for SQS messages
    sqsService.startPolling(3000) // Adjust interval as needed

    console.log('SQS polling started...')
  }
};
