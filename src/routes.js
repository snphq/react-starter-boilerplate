import Home from 'pages/Home';
import UserInfo from 'pages/UserInfo';
import Email from 'pages/Email';

import { fetchUsers, fetchUser } from 'models/users/sagas';

import { fetchUsersIds } from 'api/users';

export default [
  {
    path: '/',
    exact: true,
    cache: false,
    component: Home,
    sagasToRun: [fetchUsers],
    title: 'Home',
    sitemap: true,
  },
  {
    path: '/users/:id',
    cache: false,
    component: UserInfo,
    sagasToRun: [[fetchUser, ({ id }) => ({ payload: { id } })]],
    title: 'User',
    sitemap: () =>
      fetchUsersIds().then(({ data }) => data.map(id => `/users/${id}`)),
  },
  {
    path: '/email',
    cache: false,
    component: Email,
    title: 'Email',
    sitemap: false,
  },
];
