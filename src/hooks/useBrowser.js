import bowser from 'bowser';
import useVariable from './useVariable';

export default () => {
  if (RUNTIME_ENV === 'client') {
    const [browserInfo] = useVariable(bowser.parse(window.navigator.userAgent));
    return browserInfo;
  }

  return {
    platform: { type: 'desktop' },
    browser: { name: 'default' },
    os: { name: 'default' },
  };
};
