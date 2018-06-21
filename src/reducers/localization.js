import messages from '_localization';
import { defaultLocale } from '_config';
import _keys from 'lodash/keys';

import { SET_LOCALE } from '_constants';

const intialState = {
  locales: _keys(messages),
  current: defaultLocale,
  messages: messages[defaultLocale],
};

const localization = (state = intialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_LOCALE:
      return {
        ...state,
        current: payload,
        messages: messages[payload],
      };

    default:
      return state;
  }
};

export default localization;
