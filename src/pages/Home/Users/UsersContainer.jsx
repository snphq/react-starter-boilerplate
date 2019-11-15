import React, { useEffect } from 'react';

import { fetchUsers as fetchUsersAction } from 'models/users/slice';
import useAction from 'hooks/useAction';
import useSelector from 'hooks/useSelector';

import { usersListSelector, isFetchingSelector } from 'models/users/selectors';

import Users from './Users';

const UsersContainer = () => {
  const onFetchUsers = useAction(fetchUsersAction.type);
  const users = useSelector(usersListSelector);
  const fetching = useSelector(isFetchingSelector);

  useEffect(() => {
    onFetchUsers();
  }, [onFetchUsers]);

  return <Users list={users} fetching={fetching} />;
};

export default UsersContainer;
