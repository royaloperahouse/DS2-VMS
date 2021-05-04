"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.videos.search(ctx.query);
    } else {
      entities = await strapi.services.videos.find(ctx.query);
    }

    return entities.map((entity) => {
      const videos = sanitizeEntity(entity, {
        model: strapi.models.videos,
      });
      //   videos.foo = "123";
      return videos;
    });
  },
};
