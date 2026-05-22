/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://yogesh2850.github.io/grasp',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};
