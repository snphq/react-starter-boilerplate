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
    apiKey: 'f039470702b628d06a1e6921a19bc369-bbbc8336-19efd2f0',
    domain: 'sandbox84f999db5cac4616bc25fdb741e871f6.mailgun.org',
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
