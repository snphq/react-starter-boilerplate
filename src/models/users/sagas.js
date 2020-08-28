import { takeLatest, all, put, call } from 'redux-saga/effects';

import * as api from 'api';

import { actions } from './slice';

export function* fetchUsers() {
  try {
    const response = yield call(api.fetchUsers);
    yield put({
      type: actions.fetchUsersSuccess,
      payload: { users: response.data },
    });
  } catch (err) {
    console.error(err);
  }
}

export function* fetchUser({ payload }) {
  try {
    const response = yield call(api.fetchUser, payload.id);
    yield put({
      type: actions.fetchUserSuccess,
      payload: { user: response.data },
    });
  } catch (err) {
    console.error(err);
  }
}

export default function*() {
  yield all([takeLatest(actions.fetchUser, fetchUser)]);
  yield all([takeLatest(actions.fetchUsers, fetchUsers)]);
}
