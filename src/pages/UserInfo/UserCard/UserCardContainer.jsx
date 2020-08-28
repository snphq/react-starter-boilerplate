import React from 'react';
import { useParams } from 'react-router-dom';

import { actions } from 'models/users/slice';
import { itemSelector, isFetchingSelector } from 'models/users/selectors';

import useAction from 'hooks/useAction';
import useSelector from 'hooks/useSelector';
import useComponentDidMount from 'hooks/useComponentDidMount';

import UserCard from './UserCard';

const UserСardContainer = () => {
  const params = useParams();
  const userId = Number(params.id);

  const onFetchUser = useAction(actions.fetchUser);
  const user = useSelector(itemSelector, userId);
  const fetching = useSelector(isFetchingSelector);

  useComponentDidMount(() => {
    if (!user.fetched) {
      onFetchUser({ id: userId });
    }
  });

  return <UserCard item={user} fetching={fetching} fetched={user.fetched} />;
};

export default UserСardContainer;
