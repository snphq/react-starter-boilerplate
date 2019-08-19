import HomePage from '_pages/HomePage';
import UserInfoPage from '_pages/UserInfoPage';

import { fetchUsers, fetchUser } from '_redux/users/sagas';

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
