const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::filtered-user.filtered-user', ({ strapi }) => ({
  async find(ctx) {
    try {
      const { SearchTerm, page = 1, pageSize = 25, sort = 'id:desc', populate = 'details' } = ctx.query;

      // Base filter for status
      const baseFilters = {
        status: { $eq: 'published' },
      };

     const searchFilters = SearchTerm
    ? {
        $or: SearchTerm.split(' ').map(term => ({
          $or: [
            { username: { $containsi: term } },
            { 'details': { firstname: { $containsi: term }  } },
            { 'details': { lastname: { $containsi: term } } }
          ],
        })),
      }
    : {}; // For returning all users when no SearchTerm is provided
  
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
        start: Number(start)
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

      // remove these fields
      const excludeFields = ['password', 'resetPasswordToken', 'confirmationToken'];

      const filteredUsers = users.map(user => {
        const filteredUser = { ...user };
        excludeFields.forEach(field => delete filteredUser[field]);
        return filteredUser;
      })
      // Return the data and meta information
      return ctx.send({
        data: filteredUsers,
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
