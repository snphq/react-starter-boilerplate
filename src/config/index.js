const production = require('./production').default;
const staging = require('./staging').default;

const configs = {
  production,
  staging,
};

export default {
  port: process.env.PORT,
  defaultLocale: 'en',
  htmlMinifier: {
    collapseWhitespace: true,
    removeComments: true,
    trimCustomFragments: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true,
  },
  mailer: {
    from: 'Mailgun <me@samples.mailgun.org>',
    to: 'alan.hadzaragov@saltpepper.ru',
    domain: 'sandbox46deb311677e43eaac79065c1e310df2.mailgun.org',
    list: 'test-list',
  },
  app: {
    htmlAttributes: { lang: 'en' },
    title: 'React Starter Boilerplate',
    link: [
      {
        rel: 'shortcut icon',
        href: '/favicon.ico',
      },
    ],
    meta: [
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
      {
        name: 'description',
        content: 'The best react universal starter boilerplate in the world.',
      },
    ],
  },
  ...configs[process.env.APP_ENV],
};
