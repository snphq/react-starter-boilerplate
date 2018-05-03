import React, { Fragment } from 'react';
import Helmet from 'react-helmet';

import Users from './Users';

const HomePage = () => (
  <Fragment>
    <Helmet title="Home" />
    <Users />
  </Fragment>
);

export default HomePage;
