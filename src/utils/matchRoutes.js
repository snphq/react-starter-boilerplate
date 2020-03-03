import { matchRoutes } from 'react-router-config';

export default (routes, route) => {
  const branch = matchRoutes(routes, route);

  return (
    branch[0] || {
      route: {
        sagasToRun: [],
        title: '404 - Not found',
        cache: true,
      },
      match: { params: {} },
    }
  );
};
