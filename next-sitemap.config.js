/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://allenwang.it.com',
  generateRobotsTxt: true,
  // The résumé page is not linked from the site yet; keep it out of the index.
  exclude: ['/resume', '/*/resume'],
};
