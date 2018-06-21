import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import users from './users';
import localization from './localization';

const rootReducer = combineReducers({
  routing: routerReducer,
  users,
  localization,
});

export default rootReducer;
