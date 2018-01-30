import Req, { externalRequest } from './request';

export const fetchUsers = () =>
  Req.GET({
    url: '/users',
  });

export const fetchUser = id =>
  Req.GET({
    url: `/user/${id}`,
  });

export const fetchUserExternal = id =>
  externalRequest(`https://jsonplaceholder.typicode.com/users/${id}`, {});

export const fetchUsersExternal = () =>
  externalRequest('https://jsonplaceholder.typicode.com/users', {});
