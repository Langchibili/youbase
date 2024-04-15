'use strict';

/**
 * engagement service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::engagement.engagement');
