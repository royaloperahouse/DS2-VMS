const { sanitizeEntity } = require('strapi-utils');

module.exports = {

  /**
   * Retrieve Perfromances conforming to the requirements of Prismic API.
   *
   * @return {Array}
   */
  async find(ctx) {
    let entities = await strapi.services.performances[ctx.query._q ? "search" : "find"](ctx.query);
    entities = entities.map(entity => sanitizeEntity(entity, { model: strapi.models.performances }));
    return {
      results_size: entities.length,
      results: entities.map(entity => ({
        id: entity.diese_activity_id,
        title: entity.diese_activity_title,
        description: "Digital Performance",
        image_url: "https://static.roh.org.uk/redesign/Logo_detail.png",
        last_update: Date.parse(entity.updated_at),
        blob: entity
      }))
    };
  },

};