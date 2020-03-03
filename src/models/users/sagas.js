import { takeLatest, all, put, call } from 'redux-saga/effects';

import * as api from 'api';

import {
  fetchUsers as fetchUsersAction,
  fetchUser as fetchUserAction,
  fetchUserSuccess as fetchUserSuccessAction,
  fetchUsersSuccess as fetchUsersSuccessAction,
} from './slice';

export function* fetchUsers() {
  try {
    const response = yield call(api.fetchUsers);
    yield put({
      type: fetchUsersSuccessAction.type,
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
      type: fetchUserSuccessAction.type,
      payload: { user: response.data },
    });
  } catch (err) {
    console.error(err);
  }
}

export default function*() {
  yield all([takeLatest(fetchUserAction.type, fetchUser)]);
  yield all([takeLatest(fetchUsersAction.type, fetchUsers)]);
}
