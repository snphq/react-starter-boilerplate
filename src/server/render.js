import React from 'react';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';

import App from '../app';
import routes from '../routes';
import renderHtml from '../utils/renderHtml';

/* eslint-disable import/extensions */
import assets from '../../public/webpack-assets';
/* eslint-disable import/extensions */

export default (store, route) => {
  const AppComponent = (
    <Provider store={store}>
      <StaticRouter location={route} context={{}}>
        <App routes={routes} />
      </StaticRouter>
    </Provider>
  );

  const head = Helmet.renderStatic();
  const htmlContent = renderToString(AppComponent);
  const state = store.getState();

  return renderHtml(
    head,
    assets,
    htmlContent,
    state,
  );
};
