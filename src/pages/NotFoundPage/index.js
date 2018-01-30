import React from 'react';
import Helmet from 'react-helmet';

import NotFound from './NotFound';

const NotFoundPage = () => (
  <div>
    <Helmet title="User info" />
    <NotFound />
  </div>
);

export default NotFoundPage;
