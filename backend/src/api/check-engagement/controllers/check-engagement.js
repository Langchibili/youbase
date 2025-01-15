const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::check-engagement.check-engagement', ({ strapi }) => ({
  async find(ctx) {
    try {
      const { userId, postId, engagementType } = ctx.query;

      // Mapping engagement types to Strapi relations
      const engagementMappings = {
        likes: 'postLikedBy',
        shares: 'postSharedBy',
        views: 'postViewedBy',
        plays: 'postPlayedBy',
        impressions: 'postSeenBy',
      };

      const relationField = engagementMappings[engagementType];

      if (!relationField) {
        return ctx.badRequest('Invalid engagement type');
      }

      // Query to find posts where the user is part of the relation
      const posts = await strapi.entityService.findMany('api::post.post', {
        filters: {
          [relationField]: {
            id: userId, // Filter where the relation includes the userId
          },
        },
        fields: ['id'], // Only return post IDs
      });

      // Extract IDs from the response
      const postIds = posts.map(post => post.id);
      // Check if the postId exists in the returned IDs
      const hasEngaged = postIds.includes(Number(postId)); // Ensure postId is a number for strict comparison

      // Return result
      ctx.body = { hasEngaged };
    } catch (error) {
      console.error('Error in check-engagement controller:', error);
      ctx.internalServerError('An error occurred while checking engagement');
    }
  },
}));