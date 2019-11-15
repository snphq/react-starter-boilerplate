import { createSelector } from 'reselect';

export const usersSelector = createSelector(
  state => state,
  state => state.users
);

export const isFetchingSelector = createSelector(
  usersSelector,
  ({ fetching }) => fetching
);

export const usersListSelector = createSelector(
  usersSelector,
  users => users.list
);

export const userSelector = createSelector(
  usersListSelector,
  (_, id) => id,
  (list, id) => list.find(user => user.id === id)
);
