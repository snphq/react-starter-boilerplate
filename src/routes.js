import HomePage from '_pages/HomePage';
import UserInfoPage from '_pages/UserInfoPage';
import NotFoundPage from '_pages/NotFoundPage';

export default [
  {
    path: '/',
    exact: true,
    component: HomePage, // Add your route here
    loadData: () => 'Hello',
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
