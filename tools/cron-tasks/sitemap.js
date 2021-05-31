import cron from 'node-cron';

import generateSitemap from '../scripts/gen-sitemap';

export default () => {
  generateSitemap();

  cron.schedule('*/5 * * * * *', generateSitemap);
};
