import { takeLatest, all, put, call } from 'redux-saga/effects';

import * as api from '_api/users';

import {
  setUsers,
  setUserInfo,
} from '_actions/users';

import {
  FETCH_USERS_REQUEST,
  FETCH_USER_INFO_REQUEST,
} from '_constants/users';

export function* fetchUsers() {
  try {
    const response = yield call(api.fetchUsersExternal);
    yield put(setUsers(response.data));
  } catch (err) {
    console.log(err);
  }
}

export function* fetchUser({ payload }) {
  try {
    const response = yield call(api.fetchUserExternal, payload);
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
