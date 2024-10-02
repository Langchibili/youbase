'use strict';

/**
 * report-reason service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::report-reason.report-reason');
