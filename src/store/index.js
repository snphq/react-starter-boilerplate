import { routerMiddleware } from 'connected-react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import thunk from 'redux-thunk';

import { createRootReducer } from '_redux';

export default (history, initialState) => {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [thunk, routerMiddleware(history), sagaMiddleware];

  const composeEnhancers =
    (__DEV__ &&
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

  /* TODO refactoring
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      try {
        const nextReducer = require('../reducers').default;
        store.replaceReducer(nextReducer);
      } catch (error) {
        console.error(`Reducer hot reloading error ${error}`);
      }
    });
  }
  */

  return store;
};
