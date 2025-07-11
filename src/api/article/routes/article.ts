export default {
  routes: [
    {
      method: 'GET',
      path: '/articles', // GET all articles
      handler: 'article.find',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/articles/slug/:slug', // GET article by slug
      handler: 'article.findBySlug',
      config: {
        auth: false,
      },
    },
  ],
};
