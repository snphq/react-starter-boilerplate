require('@babel/register');

const fs = require('fs');
const path = require('path');
const robotstxt = require('generate-robotstxt').default;

const config = require('../../src/config').default;

robotstxt({
  policy: config.robots,
  sitemap: `${config.remoteApiUrl}/sitemap.xml`,
  host: config.remoteApiUrl,
})
  .then(content => {
    fs.writeFile(
      path.resolve(process.cwd(), 'public/robots.txt'),
      content,
      err => {
        if (err) {
          console.error(err);
        }
      }
    );
  })
  .catch(err => {
    console.error('robots.txt creating error', err);
  });
