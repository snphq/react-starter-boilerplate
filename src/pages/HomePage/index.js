import React from 'react';
import Helmet from 'react-helmet';

import Users from './Users';

const HomePage = () => (
  <div>
    <Helmet title="Home" />
    <Users />
  </div>
);

export default HomePage;
