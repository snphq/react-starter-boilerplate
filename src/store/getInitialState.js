import messages from '_localization';
import { defaultLocale } from '_config';
import _keys from 'lodash/keys';

export default (cookies = { locale: defaultLocale }) => {
  const {
    locale = defaultLocale,
  } = cookies;

  const localeState = {
    localization: {
      locales: _keys(messages),
      current: locale,
      messages: messages[locale],
    },
  };

  if (__SERVER__) {
    return {
      ...localeState,
    };
  }

  return {
    ...window.__INITIAL_STATE__,
  };
};
