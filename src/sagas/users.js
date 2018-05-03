import { takeLatest, all, put, call } from 'redux-saga/effects';

import {
  fetchUsersExternal,
  fetchUserExternal,
} from '_api';

import {
  setUsers,
  setUserInfo,
} from '_actions';

import {
  FETCH_USERS_REQUEST,
  FETCH_USER_INFO_REQUEST,
} from '_constants';

export function* fetchUsers() {
  try {
    const response = yield call(fetchUsersExternal);
    yield put(setUsers(response.data));
  } catch (err) {
    console.log(err);
  }
}

export function* fetchUser({ payload }) {
  try {
    const response = yield call(fetchUserExternal, payload);
    yield put(setUserInfo(response.data));
  } catch (err) {
    console.log(err);
  }
}

export default function* () {
  yield all([
    takeLatest(FETCH_USERS_REQUEST, fetchUsers),
    takeLatest(FETCH_USER_INFO_REQUEST, fetchUser),
  ]);
}
