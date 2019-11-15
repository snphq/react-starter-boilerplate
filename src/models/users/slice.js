/* eslint-disable no-param-reassign */

import { createSlice } from 'redux-starter-kit';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    fetching: false,
  },
  reducers: {
    fetchUser: state => {
      state.fetching = true;
      state.list = [];
    },
    fetchUsers: state => {
      state.fetching = true;
      state.list = [];
    },
    fetchUserSuccess(state, { payload }) {
      state.fetching = false;
      state.list = [payload.user];
    },
    fetchUsersSuccess(state, { payload }) {
      state.fetching = false;
      state.list = payload.users;
    },
  },
});

export const {
  fetchUsers,
  fetchUsersSuccess,
  fetchUser,
  fetchUserSuccess,
} = usersSlice.actions;

export default usersSlice.reducer;
