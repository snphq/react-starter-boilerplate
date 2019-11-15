import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { fetchUser as fetchUserAction } from 'models/users/slice';
import { userSelector, isFetchingSelector } from 'models/users/selectors';

import useAction from 'hooks/useAction';
import useSelector from 'hooks/useSelector';

import UserCard from './UserCard';

const UserСardContainer = () => {
  const params = useParams();
  const userId = Number(params.id);

  const onFetchUser = useAction(fetchUserAction.type);
  const user = useSelector(userSelector, userId);
  const fetching = useSelector(isFetchingSelector);

  useEffect(() => {
    onFetchUser({ id: userId });
  }, [onFetchUser, userId]);

  return <UserCard item={user} fetching={fetching} />;
};

export default UserСardContainer;
