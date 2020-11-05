import { createSelector } from 'reselect';

import { denormalize } from 'utils/normalizeById';

export const usersSelector = createSelector(
  state => state,
  state => state.users
);

export const isFetchingSelector = createSelector(
  usersSelector,
  ({ fetching }) => fetching
);

export const isCollectionFetchedSelector = createSelector(
  usersSelector,
  ({ collectionFetched }) => collectionFetched
);

export const collectionSelector = createSelector(usersSelector, users =>
  denormalize(users.collection)
);

export const itemSelector = createSelector(
  usersSelector,
  (_, id) => id,
  ({ collection }, id) => collection[id] || { fetched: false }
);
