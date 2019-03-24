import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { all } from 'redux-saga/effects';

/* reducers */
import usersReducer from './users/reducers';
/* reducers */

/* sagas */
import usersSagas from './users/sagas';
/* sagas */

export const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  users: usersReducer,
});

export const rootSaga = function* rootSaga() {
  yield all([
    usersSagas(),
  ]);
};

export const rootSelector = state => state;
