import { Promise } from 'bluebird';
import _flatten from 'lodash/flatten';
import { SitemapStream } from 'sitemap';
import { createWriteStream } from 'fs';
import { Readable } from 'stream';
import pathUtil from 'path';

import config from 'config';
import routes from 'src/routes';

export default () => {
  const sitemapStream = new SitemapStream({ hostname: config.remoteApiUrl });

  const routesForSitemap = routes.filter(
    ({ sitemap }) => sitemap === true || typeof sitemap === 'function'
  );

  Promise.map(routesForSitemap, ({ sitemap, path }) => {
    if (typeof sitemap === 'function') {
      return sitemap();
    }

    return path;
  })
    .then(links => _flatten(links))
    .then(links =>
      Readable.from(links)
        .pipe(sitemapStream)
        .pipe(
          createWriteStream(
            pathUtil.resolve(process.cwd(), 'public/sitemap.xml')
          )
        )
        .on('error', err => console.error('sitemap creating error', err))
    );
};
