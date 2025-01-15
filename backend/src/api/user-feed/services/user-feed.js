'use strict';

/**
 * user-feed service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-feed.user-feed');
