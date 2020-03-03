import { all, fork, join } from 'redux-saga/effects';

export default (store, sagasToRun, params) => {
  const sagas = sagasToRun.map(saga => {
    if (Array.isArray(saga)) {
      return saga[0].bind(null, saga[1](params));
    }

    return saga;
  });

  return store
    .runSaga(function* runSagas() {
      const tasks = yield all(sagas.map(saga => fork(saga)));
      yield all(tasks.map(task => join(task)));
    })
    .toPromise();
};
