import {
  SET_USERS,
  SET_USER_INFO,
} from '_actions/constants/users';

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
      const userInfo = (({
        name,
        website,
        phone,
        email,
      }) => ({
        name,
        website,
        phone,
        email,
      }))(payload);

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
