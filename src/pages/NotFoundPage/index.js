import React, { Fragment } from 'react';
import Helmet from 'react-helmet';

import NotFound from './NotFound';

const NotFoundPage = () => (
  <Fragment>
    <Helmet title="User info" />
    <NotFound />
  </Fragment>
);

export default NotFoundPage;
