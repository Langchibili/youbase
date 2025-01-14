const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::filtered-user.filtered-user', ({ strapi }) => ({
  async find(ctx) {
    try {
      const { SearchTerm, page = 1, pageSize = 25, sort = 'id:desc', populate = 'details' } = ctx.query;

      // Base filter for status
      const baseFilters = {
        status: { $eq: 'published' },
      };

      // Add search term filter if provided
      const searchFilters = SearchTerm
        ? {
            $or: [
              { username: { $containsi: SearchTerm } },
              { 'details.firstname': { $containsi: SearchTerm } },
              { 'details.lastname': { $containsi: SearchTerm } },
            ],
          }
        : {};

      // Pagination calculation
      const start = (page - 1) * pageSize;

      // Fetch filtered and paginated users
      const users = await strapi.entityService.findMany('plugin::users-permissions.user', {
        filters: {
          ...baseFilters,
          ...searchFilters,
        },
        populate: populate.split(','),
        sort: sort.split(','),
        limit: Number(pageSize),
        start: Number(start),
      });

      // Fetch the total count of matching users
      const total = await strapi.entityService.count('plugin::users-permissions.user', {
        filters: {
          ...baseFilters,
          ...searchFilters,
        },
      });

      // Calculate total pages
      const pageCount = Math.ceil(total / pageSize);

      // Return the data and meta information
      return ctx.send({
        data: users,
        meta: {
          pagination: {
            page: Number(page),
            pageSize: Number(pageSize),
            pageCount,
            total,
          },
        },
      });
    } catch (error) {
      console.error(error);
      ctx.badRequest('Failed to fetch users', { error });
    }
  },
}));
