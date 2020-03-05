import serialize from 'serialize-javascript';

export const renderHtmlStart = (head, assets) =>
  `<!doctype html>
    <html ${head.htmlAttributes}>
      <head>
        <noscript>Javascript is disabled!</noscript>
        <meta charset="utf-8">
        <!--[if IE]>
        <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
        <![endif]-->

        <link rel="manifest" href="/manifest.json">
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <meta name="theme-color" content="#317EFB"/>

        ${head.meta}

        ${head.link}

        ${head.title}

        <!-- Insert bundled styles into <link> tag -->
        ${Object.keys(assets)
          .map(key =>
            key.substr(key.length - 3) === 'css'
              ? `<link href="${assets[key]}" media="screen, projection" rel="stylesheet" type="text/css">`
              : ''
          )
          .join('')}
      </head>
      <body>
        <!-- Insert the router, which passed from server-side -->
        <div id="react-view">`;

export const renderHtmlEnd = (assets, initialState) => `
  </div>
    <!-- Store the initial state into window -->
    <script>
      // Use serialize-javascript for mitigating XSS attacks. See the following security issues:
      // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
      window.__INITIAL_STATE__=${serialize(initialState)};
    </script>

    <!-- Insert bundled scripts into <script> tag -->
    ${Object.keys(assets)
      .map(key =>
        key.substr(key.length - 2) === 'js'
          ? `<script src="${assets[key]}"></script>`
          : ''
      )
      .join('')}
  </body>
</html>`;

export default (head, assets, htmlContent, initialState) => {
  return `${renderHtmlStart(head, assets)}${htmlContent}${renderHtmlEnd(
    assets,
    htmlContent,
    initialState
  )}`;
};
