import { rootSelector } from 'models';
import { createSelector } from 'reselect';

export const usersSelector = createSelector(
  rootSelector,
  ({ users }) => users.list
);

export const currentUserSelector = createSelector(
  rootSelector,
  ({ users }) => users.current
);
