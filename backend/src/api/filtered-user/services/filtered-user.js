'use strict';

/**
 * filtered-user service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::filtered-user.filtered-user');
