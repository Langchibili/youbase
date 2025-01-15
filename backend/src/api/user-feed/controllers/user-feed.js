const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::user-feed.user-feed', ({ strapi }) => ({
  async find(ctx) {
    try {
      const {
        loggedInUserId,
        page = 1,
        pageSize = 25,
        sort = 'id:desc',
        populate = 'user,featuredImages,media',
        filters,
      } = ctx.query;

      if (!loggedInUserId) {
        return ctx.badRequest("The 'loggedInUserId' parameter is required");
      }

      // Step 1: Fetch IDs of users that the logged-in user follows
      const followingUsers = await strapi.entityService.findMany('plugin::users-permissions.user', {
        filters: {
          follows: {
            id: loggedInUserId,
          },
        },
        fields: ['id'], // Only return user IDs
      });

      const followingUserIds = followingUsers.map(user => user.id);

      if (followingUserIds.length === 0) {
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

      // Step 2: Parse and apply complex filters
      const parsedFilters = filters ? JSON.parse(filters) : {};
      const baseFilters = {
        user: { id: { $in: followingUserIds } }, // Only posts by followed users
      };

      const combinedFilters = {
        $and: [baseFilters, parsedFilters], // Combine base filters with user-provided filters
      };

      // Step 3: Pagination calculations
      const start = (page - 1) * pageSize;

      // Step 4: Fetch posts with combined filters
      const posts = await strapi.entityService.findMany('api::post.post', {
        filters: combinedFilters,
        populate: populate.split(','),
        sort: sort.split(','),
        limit: Number(pageSize),
        start: Number(start),
      });

      // Step 5: Count total posts matching the filters
      const total = await strapi.entityService.count('api::post.post', { filters: combinedFilters });

      const pageCount = Math.ceil(total / pageSize);

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

