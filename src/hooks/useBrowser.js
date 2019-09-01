import browserParser from 'bowser';
import useVariable from '_hooks/useVariable';

export default () => {
  const [browser] = useVariable(
    (() => {
      if (RUNTIME_ENV === 'client') {
        return browserParser.parse(window.navigator.userAgent);
      }

      return {
        platform: { type: 'desktop' },
        browser: { name: 'default' },
        os: { name: 'default' },
      };
    })()
  );

  return browser;
};
