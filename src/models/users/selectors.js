import { createSelector } from 'reselect';

export const usersSelector = createSelector(
  state => state,
  ({ users }) => users.list
);

export const userSelector = createSelector(
  state => state,
  (_, id) => id,
  ({ users }, id) => users.list.find(user => user.id === id)
);
