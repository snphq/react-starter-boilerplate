import { takeLatest, all, put, call } from 'redux-saga/effects';

import createAction from '_utils/createAction';

import {
  fetchUsersExternal,
  fetchUserExternal,
} from '_api';

import {
  SET_USERS,
  SET_USER_INFO,
  FETCH_USERS,
  FETCH_USER_INFO,
} from './actions';

export function* fetchUsers() {
  try {
    const response = yield call(fetchUsersExternal);
    yield put(createAction(SET_USERS)(response.data));
  } catch (err) {
    console.error(err);
  }
}

export function* fetchUser({ payload }) {
  try {
    const response = yield call(fetchUserExternal, payload);
    yield put(createAction(SET_USER_INFO)(response.data));
  } catch (err) {
    console.error(err);
  }
}

export default function* () {
  yield all([
    takeLatest(FETCH_USERS, fetchUsers),
    takeLatest(FETCH_USER_INFO, fetchUser),
  ]);
}
