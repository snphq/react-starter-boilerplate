import browser from 'bowser';

export default () => {
  if (!process.env.RUNTIME_ENV === 'client') {
    return browser.parse(window.navigator.userAgent);
  }

  return {
    platform: { type: 'desktop' },
    browser: { name: 'default' },
    os: { name: 'default' },
  };
};
