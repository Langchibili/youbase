const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('plugin::users-permissions.user', ({ strapi }) => ({
  async find(ctx) {
    try {
      // Sanitize query parameters
      const sanitizedQueryParams = await this.sanitizeQuery(ctx);
      
      // Extract username from sanitized query parameters
      const { username } = sanitizedQueryParams;

      if (!username) {
        ctx.badRequest("Username is required to search for user");
        return;
      }

      // Check if a user exists with the provided username
      const user = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: { username: username }
      });

      // If user exists, return the user; otherwise, return a 404 not found response
      if (user) {
        return ctx.send({ user });
      } else {
        ctx.notFound("User not found");
      }
    } catch (error) {
      // Handle errors
      console.error(error);
      ctx.badRequest('Failed to check if user exists');
    }
  },
}));
