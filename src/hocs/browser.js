import React from 'react';
import getBrowserInfo from '_utils/getBrowserInfo';

const {
  browser: { name, version },
  os: { name: os },
  platform: { type: platform },
} = getBrowserInfo();

export default WrappedComponent => props => (
  <WrappedComponent
    {...props}
    browser={{
      name,
      os,
      platform,
      version,
    }}
  />
);
