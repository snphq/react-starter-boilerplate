import { all, fork, join } from 'redux-saga/effects';
import _isArray from 'lodash/isArray';

export default (store, branch) => {
  const sagas = branch.reduce((acc, { route: { sagasToRun }, match: { params } }) => {
    if (sagasToRun) {
      return acc.concat(sagasToRun.map((saga) => {
        if (_isArray(saga)) {
          return saga[0].bind(null, saga[1](params));
        }

        return saga;
      }));
    }

    return acc;
  }, []);

  return store.runSaga(function* runSagas() {
    const tasks = yield all(sagas.map(saga => fork(saga)));
    yield all(tasks.map(task => join(task)));
  }).done;
};
