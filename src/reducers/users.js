import _pick from 'lodash/pick';

import {
  SET_USERS,
  SET_USER_INFO,
} from '_constants';

const initialState = {
  current: null,
  list: [],
};

const users = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_USERS:
      return {
        ...state,
        list: payload,
      };

    case SET_USER_INFO: {
      const userInfo = _pick(payload, [
        'name',
        'website',
        'phone',
        'email',
      ]);

      return {
        ...state,
        current: {
          ...userInfo,
        },
      };
    }

    default:
      return state;
  }
};

export default users;
