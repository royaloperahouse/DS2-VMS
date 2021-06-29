const { sanitizeEntity } = require('strapi-utils');

module.exports = {

    /**
     * Creates a Video record and associates it with the relevant Performace.
     *
     * @return {Object}
     */
    async create(ctx) {
        const { diese_activity_id } = ctx.request.body;
        let performance = await strapi.services.performances.findOne({ diese_activity_id });
        if (!performance) performance = await strapi.services.performances.create({ diese_activity_id });

        const video = await strapi.services.videos.create({ ...ctx.request.body, performance });
        return sanitizeEntity(video, { model: strapi.models.videos });
    },

};
