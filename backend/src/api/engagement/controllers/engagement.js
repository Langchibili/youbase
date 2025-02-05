const { createCoreController } = require('@strapi/strapi').factories;

// utility functions
const getPreviousDay = (inputDate, targetDay)=> {
    // Map day names to numbers (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const dayMap = {
      sunday: 0,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
    };
  
    // Convert targetDay to a number (case-insensitive)
    const targetDayNumber =
      typeof targetDay === "string" ? dayMap[targetDay.toLowerCase()] : targetDay;
  
    // Validate input
    if (
      isNaN(targetDayNumber) ||
      targetDayNumber < 0 ||
      targetDayNumber > 6
    ) {
      throw new Error("Invalid target day. Use a string (e.g., 'Sunday') or number (0-6).");
    }
  
    // Get current day of the week (0-6)
    const currentDay = inputDate.getDay();
  
    // Calculate days to subtract
    let daysToSubtract = (currentDay - targetDayNumber + 7) % 7;
    daysToSubtract = daysToSubtract === 0 ? 7 : daysToSubtract; // Ensure we go back a full week if same day
  
    // Calculate result
    const resultDate = new Date(inputDate);
    resultDate.setDate(resultDate.getDate() - daysToSubtract);
  
    return resultDate;
}

module.exports = createCoreController('api::engagement.engagement', ({ strapi }) => ({
   async find(ctx) {
    try {
      const { postId, engagementType } = ctx.query
      const engagementTypes = ['likes','plays','views','shares','commentsCount']
      if(!engagementTypes.includes(engagementType)){
        return
      }
      let engagementObject = {}
      const today =  new Date()
      const todayDisplay =  today.toISOString().split("T")[0];
      const monthDisplay = todayDisplay.split("-")[0] + '-' + todayDisplay.split("-")[1];
      const yearDisplay = todayDisplay.split("-")[0];
      const previousSunday = getPreviousDay(today, "Sunday").toISOString().split("T")[0];
      const weekOf = "week-of-" + previousSunday;

      // Fetch existing engagements
      const engagements = await strapi.entityService.findMany('api::engagement.engagement', {
        filters: { post: postId }
      });

      if (engagements.length === 0) {
        // Initialize new engagement
        const initialEngagement = {
          likes: 0,
          plays: 0,
          views: 0,
          shares: 0,
          commentsCount: 0,
          toEngagement: 1  // Start with 1 for the initial engagement
        }

        const newEngagement = {
          post: postId, // Use direct ID assignment instead of {connect: [...]}
          daily: { 
            [todayDisplay]: { ...initialEngagement, [engagementType]: 1 } 
          },
          weekly: { 
            [weekOf]: { ...initialEngagement, [engagementType]: 1 } 
          },
          monthly: { 
            [monthDisplay]: { ...initialEngagement, [engagementType]: 1 } 
          },
          yearly: { 
            [yearDisplay]: { ...initialEngagement, [engagementType]: 1 } 
          }
        };
        await strapi.entityService.create('api::engagement.engagement', { data: newEngagement });
        return { ok: true };
      }

      // Update existing engagement
      engagementObject = { ...engagements[0] };
      let count = 1;

      // Handle concurrency duplicates
      if (engagements.length > 1) {
        count = engagements.length; // Total concurrent engagements
        // Delete duplicates (keep the first one)
        for (let i = 1; i < engagements.length; i++) {
          await strapi.entityService.delete('api::engagement.engagement', engagements[i].id);
        }
      }

      // Update DAILY (FIX TYPO: "daily" not "dairy")
      engagementObject.daily = engagementObject.daily || {};
      engagementObject.daily[todayDisplay] = {
        ...engagementObject.daily[todayDisplay],
        [engagementType]: (engagementObject.daily[todayDisplay]?.[engagementType] || 0) + count,
        toEngagement: (engagementObject.daily[todayDisplay]?.toEngagement || 0) + count,
      };

      // Update WEEKLY
      engagementObject.weekly = engagementObject.weekly || {};
      engagementObject.weekly[weekOf] = {
        ...engagementObject.weekly[weekOf],
        [engagementType]: (engagementObject.weekly[weekOf]?.[engagementType] || 0) + count,
        toEngagement: (engagementObject.weekly[weekOf]?.toEngagement || 0) + count,
      };

      // Update MONTHLY
      engagementObject.monthly = engagementObject.monthly || {};
      engagementObject.monthly[monthDisplay] = {
        ...engagementObject.monthly[monthDisplay],
        [engagementType]: (engagementObject.monthly[monthDisplay]?.[engagementType] || 0) + count,
        toEngagement: (engagementObject.monthly[monthDisplay]?.toEngagement || 0) + count,
      };

      // Update YEARLY
      engagementObject.yearly = engagementObject.yearly || {};
      engagementObject.yearly[yearDisplay] = {
        ...engagementObject.yearly[yearDisplay],
        [engagementType]: (engagementObject.yearly[yearDisplay]?.[engagementType] || 0) + count,
        toEngagement: (engagementObject.yearly[yearDisplay]?.toEngagement || 0) + count,
      };

      // Remove fields that can't be updated
      delete engagementObject.id;
      delete engagementObject.createdAt;
      delete engagementObject.updatedAt;

      // Save changes
      await strapi.entityService.update(
        'api::engagement.engagement',
        engagements[0].id,
        { data: engagementObject }
      );

      return { ok: true };
    } catch (error) {
      console.error('Error:', error);
      ctx.internalServerError('Failed to log engagement');
    }
  }
}));