import { all, fork, join } from 'redux-saga/effects';

export default async (store, branch) => {
  const sagasToRun = branch.reduce((sagas, { route }) => {
    if (route.sagasToRun) {
      return sagas.concat(route.sagasToRun);
    }

    return sagas;
  }, []);

  return store.runSaga(function* runSagas() {
    const tasks = yield all(sagasToRun.map(saga => fork(saga)));
    yield all(tasks.map(task => join(task)));
  }).done;
};
