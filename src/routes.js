import HomePage from 'pages/HomePage';
import UserInfoPage from 'pages/UserInfoPage';

import { fetchUsers, fetchUser } from 'models/users/sagas';

export default [
  {
    path: '/',
    exact: true,
    cache: false,
    component: HomePage,
    sagasToRun: [fetchUsers],
  },
  {
    path: '/users/:id',
    cache: false,
    component: UserInfoPage,
    sagasToRun: [[fetchUser, ({ id }) => ({ payload: id })]],
  },
];
