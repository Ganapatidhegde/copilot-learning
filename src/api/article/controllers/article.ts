import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::article.article', ({ strapi }) => ({
    async find(ctx) {
        const articles = await strapi.entityService.findMany('api::article.article', {
            filters: ctx.query.filters || {},
            populate: '*',
        });

        return ctx.send({ data: articles });
  },

  async findBySlug(ctx) {
    const { slug } = ctx.params;

    const articles = await strapi.entityService.findMany('api::article.article', {
      filters: {
        slug: slug,
      },
    populate: {
        articleImage: true,
        tags: true,
        author: {
          populate: ['image'],
        },
    },
    });

    if (!articles || articles.length === 0) {
      return ctx.notFound('Article not found');
    }

    return ctx.send({ data: articles[0] });
  },
}));
