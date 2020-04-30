/* eslint-disable no-param-reassign */

import { createSlice } from 'redux-starter-kit';

import actionTypes from 'utils/actionTypes';

import { normalize } from 'utils/normalizeById';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    collection: {},
    fetching: true,
    collectionFetched: false,
  },
  reducers: {
    fetchUser: state => {
      state.fetching = true;
    },
    fetchUsers: state => {
      state.fetching = true;
    },
    fetchUserSuccess(state, { payload }) {
      state.fetching = false;
      state.collection[payload.user.id] = { ...payload.user, fetched: true };
    },
    fetchUsersSuccess(state, { payload }) {
      state.fetching = false;
      state.collectionFetched = true;
      state.collection = normalize(payload.users);
    },
  },
});

export const actions = actionTypes(usersSlice.actions);

export default usersSlice.reducer;
