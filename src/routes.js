import Home from 'pages/Home';
import UserInfo from 'pages/UserInfo';
import Email from 'pages/Email';

import { fetchUsers, fetchUser } from 'models/users/sagas';

export default [
  {
    path: '/',
    exact: true,
    cache: false,
    component: Home,
    sagasToRun: [fetchUsers],
    title: 'Home',
  },
  {
    path: '/users/:id',
    cache: false,
    component: UserInfo,
    sagasToRun: [[fetchUser, ({ id }) => ({ payload: { id } })]],
    title: 'User',
  },
  {
    path: '/email',
    cache: false,
    component: Email,
    title: 'Email',
  },
];
