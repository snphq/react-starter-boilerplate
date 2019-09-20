import { SET_USERS, SET_USER_INFO } from './actions';

const initialState = {
  current: null,
  list: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_USERS:
      return {
        ...state,
        list: payload,
      };

    case SET_USER_INFO: {
      return {
        ...state,
        current: {
          name: payload.name,
          website: payload.website,
          phone: payload.phone,
          email: payload.email,
        },
      };
    }

    default:
      return state;
  }
};
