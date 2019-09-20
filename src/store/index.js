import { routerMiddleware } from 'connected-react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';

import { createRootReducer } from 'models';

export default (history, initialState) => {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [routerMiddleware(history), sagaMiddleware];

  const composeEnhancers =
    (process.env.APP_ENV === 'development' &&
      typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  const enhancers = composeEnhancers(applyMiddleware(...middlewares));

  const store = createStore(
    createRootReducer(history),
    initialState,
    enhancers
  );

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  return store;
};
