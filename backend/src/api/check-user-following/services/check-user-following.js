'use strict';

/**
 * check-user-following service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::check-user-following.check-user-following');
