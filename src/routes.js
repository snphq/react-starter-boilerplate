import HomePage from '_pages/HomePage';
import UserInfoPage from '_pages/UserInfoPage';
import NotFoundPage from '_pages/NotFoundPage';
import LocalizationPage from '_pages/LocalizationPage';
import App from './app';

import { fetchUsers } from '_sagas/users';

export default [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: HomePage,
        sagasToRun: [
          fetchUsers,
        ],
      },
      {
        path: '/users/:id',
        component: UserInfoPage,
      },
      {
        path: '/localization',
        component: LocalizationPage,
      },
      {
        component: NotFoundPage,
      },
    ],
  },
];
