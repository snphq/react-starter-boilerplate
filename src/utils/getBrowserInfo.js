import browser from 'bowser';

export default () => {
  if (!__CLIENT__) {
    return {
      platform: { type: 'desktop' },
      browser: { name: 'default' },
      os: { name: 'default' },
    };
  }

  return browser.parse(window.navigator.userAgent);
};
