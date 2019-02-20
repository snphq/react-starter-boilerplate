import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import users from './users';
import localization from './localization';

export default history => combineReducers({
  router: connectRouter(history),
  users,
  localization,
});
