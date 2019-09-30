import React from 'react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';

import routes from '../routes';
import App from '../components/App';

export default (route, store, helmetContext) => {
  const AppComponent = (
    <Provider store={store}>
      <StaticRouter location={route} context={{}}>
        <HelmetProvider context={helmetContext}>
          <App routes={routes} />
        </HelmetProvider>
      </StaticRouter>
    </Provider>
  );

  return renderToString(AppComponent);
};
