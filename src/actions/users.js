import {
  FETCH_USERS_REQUEST,
  SET_USERS,
  FETCH_USER_INFO_REQUEST,
  SET_USER_INFO,
} from './constants';

export const fetchUsers = () => ({
  type: FETCH_USERS_REQUEST,
  payload: null,
});

export const setUsers = users => ({
  type: SET_USERS,
  payload: users,
});

export const fetchUserInfo = id => ({
  type: FETCH_USER_INFO_REQUEST,
  payload: id,
});

export const setUserInfo = userInfo => ({
  type: SET_USER_INFO,
  payload: userInfo,
});
