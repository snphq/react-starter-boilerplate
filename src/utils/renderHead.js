import config from '../config';

export default () => ({
  base: '',
  script: '',
  link: config.app.link
    .map(({ rel, href }) => `<meta rel="${rel}" content="${href}">`)
    .join('\n'),
  meta: config.app.meta
    .map(({ name, content }) => `<meta name="${name}" content="${content}">`)
    .join('\n'),
  title: `<title>${config.app.title}</title>`,
  htmlAttributes: Object.keys(config.app.htmlAttributes).reduce(
    (acc, key) => `${acc} ${key} = "${config.app.htmlAttributes[key]}"`,
    ''
  ),
});
