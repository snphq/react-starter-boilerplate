import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware, { END } from 'redux-saga';

import { createRootReducer } from 'models';

export default (history, initialState) => {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    middleware: [
      ...getDefaultMiddleware(),
      routerMiddleware(history),
      sagaMiddleware,
    ],
    reducer: createRootReducer(history),
    preloadedState: initialState,
    devTools: process.env.APP_ENV !== 'production',
  });

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  return store;
};
