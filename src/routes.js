import HomePage from '_pages/HomePage';
import UserInfoPage from '_pages/UserInfoPage';
import NotFoundPage from '_pages/NotFoundPage';

import {
  fetchUsers,
} from '_sagas/users';

export default [
  {
    path: '/',
    exact: true,
    component: HomePage, // Add your route here
    sagasToRun: [
      fetchUsers,
    ],
  },
  {
    path: '/users/:id',
    component: UserInfoPage,
    loadData: () => 'Hello',
  },
  {
    path: '*',
    component: NotFoundPage,
  },
];
