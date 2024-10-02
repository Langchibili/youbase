const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::content.content', ({ strapi }) => ({
  async find(ctx) {
    try {
      // Sanitize query parameters
      const sanitizedQueryParams = await this.sanitizeQuery(ctx);

      // Extract query parameters
      const type = sanitizedQueryParams.type;
      const mediaOnly = sanitizedQueryParams.mediaOnly;
      const search = sanitizedQueryParams.search;
      const orderBy = sanitizedQueryParams.orderBy || 'createdAt:desc';
      // @ts-ignore
      const limit = sanitizedQueryParams.limit ? parseInt(sanitizedQueryParams.limit) : 10;
      // @ts-ignore
      const page = sanitizedQueryParams.page ? parseInt(sanitizedQueryParams.page) : 1;
      const populate = sanitizedQueryParams.populate; // The populate query param

      // Check if post type is provided
      if (!type) {
        return ctx.badRequest('The post type is required to search for content');
      }

      // Prepare where conditions
      const whereConditions = {
        ...(type && type !== 'all' && { type }),
        ...(search && { title: { $containsi: search } }), // Search functionality
      };

      // Define which fields to populate
      let populateFields = {};

      if (populate) {
        // @ts-ignore
        populateFields = { [populate]: true }; // Populate the explicitly requested field
      // @ts-ignore
      } else if (!mediaOnly && ['image', 'music', 'video'].includes(type)) {
        // If no mediaOnly and the type is image, music, or video, default populate all
        populateFields = { media: true };
      }

      // Query posts using `strapi.db.query`
      const posts = await strapi.db.query('api::post.post').findMany({
        where: whereConditions,
        // @ts-ignore
        orderBy: { [orderBy.split(':')[0]]: orderBy.split(':')[1] },
        limit: limit,
        offset: (page - 1) * limit,
        populate: populateFields, // Populate specified fields
      });

      // If mediaOnly is true, extract media files and return a flat array of media objects
      if (mediaOnly) {
        const mediaArray = posts.flatMap(post => post.media || []);
        return ctx.send({ media: mediaArray });
      }

      // Return the posts as they are
      if (posts.length > 0) {
        return ctx.send({ posts });
      } else {
        return ctx.notFound('No posts found');
      }
    } catch (error) {
      console.error(error);
      return ctx.badRequest('Failed to retrieve posts');
    }
  },
}));

//http://localhost:1339/api/contents?type=music&mediaOnly=true&populate=media
