'use strict';

/**
 * check-engagement service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::check-engagement.check-engagement');
