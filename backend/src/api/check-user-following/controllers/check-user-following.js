const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::check-user-following.check-user-following', ({ strapi }) => ({
  async find(ctx) {
    try {
      const { loggedInUserId, otherUserId } = ctx.query;

      if (!loggedInUserId || !otherUserId) {
        return ctx.badRequest('Invalid following check request');
      }

      // Query to get all the users who loggedInUserId follows
      const users = await strapi.entityService.findMany('plugin::users-permissions.user', {
        filters: {
          "follows": {
            id: loggedInUserId, // Filter where the relation includes the userId
          },
        },
        fields: ['id'], // Only return post IDs
      });

      // Extract IDs from the response
      const userIds = users.map(user => user.id)
      // Check if the otherUserId exists in the returned user IDs
      const isFollowing = userIds.includes(Number(otherUserId)) // Ensure postId is a number for strict comparison

      // Return result
      ctx.body = { isFollowing }
    } catch (error) {
      console.error('Error in user following controller:', error);
      ctx.internalServerError('An error occurred while checking user following');
    }
  },
}));