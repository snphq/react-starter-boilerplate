import production from './production';
import staging from './staging';

const configs = {
  production,
  staging,
};

export default {
  port: process.env.PORT,
  defaultLocale: 'en',
  mailer: {
    from: 'Mailgun <me@samples.mailgun.org>',
    to: 'alan.hadzaragov@saltpepper.ru',
    domain: 'test-list@sandbox46deb311677e43eaac79065c1e310df2.mailgun.org',
    list: 'test-list',
  },
  app: {
    htmlAttributes: { lang: 'en' },
    title: 'React Starter Boilerplate',
    titleTemplate: 'React Starter Boilerplate - %s',
    meta: [
      {
        name: 'description',
        content: 'The best react universal starter boilerplate in the world.',
      },
    ],
  },
  ...configs[process.env.APP_ENV],
};
