const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::user-feed.user-feed', ({ strapi }) => ({
  async find(ctx) {
    try {
      const { loggedInUserId, filters = '{}', page = 1, pageSize = 25, sort = 'id:desc', populate = '' } = ctx.query;

      // Ensure filters is parsed as an object
      let parsedFilters = {};
      try {
        parsedFilters = JSON.parse(filters);
        if (typeof parsedFilters !== 'object') {
          throw new Error();
        }
      } catch {
        return ctx.badRequest('The filters parameter must be a valid JSON object or array.');
      }

      // Find users the logged-in user follows
      const followingUsers = await strapi.entityService.findMany('plugin::users-permissions.user', {
        filters: {
          follows: { id: loggedInUserId },
        },
        fields: ['id'], // Only fetch user IDs
      });

      const followingIds = followingUsers.map(user => user.id);

      if (followingIds.length === 0) {
        return ctx.send({
          data: [],
          meta: {
            pagination: {
              page: Number(page),
              pageSize: Number(pageSize),
              pageCount: 0,
              total: 0,
            },
          },
        });
      }

      // Build the final filters dynamically
      const finalFilters = {
        $and: [
          { user: { id: { $in: followingIds } } }, // Ensure posts are from followed users
          ...(parsedFilters.$and || []), // Add custom filters if provided
        ],
      };
      // Pagination calculation
      const start = (page - 1) * pageSize;
      // Fetch the total count of matching users
      const total = await strapi.entityService.count('api::post.post', {
        filters: finalFilters
      });

      // Calculate total pages
      const pageCount = Math.ceil(total / pageSize);
      
      // Fetch posts
      const posts = await strapi.entityService.findMany('api::post.post', {
        filters: finalFilters,
        sort,
        populate: populate.split(','),
        limit: Number(pageSize),
        start: Number(start)
      });

      // const structuredPosts = {data:posts.results,meta:{pagination:posts.pagination}}
      // return ctx.send(structuredPosts); // send back structured posts as posts.data
      return ctx.send({
        data: posts,
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
      ctx.badRequest('Failed to fetch user feed', { error });
    }
  },
}));
