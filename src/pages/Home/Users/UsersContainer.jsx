import React, { useEffect } from 'react';

import { fetchUsers as fetchUsersAction } from 'models/users/slice';
import useAction from 'hooks/useAction';
import useSelector from 'hooks/useSelector';

import { usersSelector } from 'models/users/selectors';

import Users from './Users';

const UsersContainer = () => {
  const onFetchUsers = useAction(fetchUsersAction.type);
  const users = useSelector(usersSelector);

  useEffect(() => {
    onFetchUsers();
  }, [onFetchUsers]);

  return <Users list={users} />;
};

export default UsersContainer;
