import React from 'react';
import Helmet from 'react-helmet';

import UserInfo from './UserInfo';

const UserInfoPage = () => (
  <div>
    <Helmet title="User info" />
    <UserInfo />
  </div>
);

export default UserInfoPage;
