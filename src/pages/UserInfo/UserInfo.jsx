import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

import UserCard from './UserCard';

const UserInfo = () => (
  <Fragment>
    <Helmet title="User info" />
    <UserCard />
  </Fragment>
);

export default UserInfo;
