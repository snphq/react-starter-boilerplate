import React from 'react';
import Helmet from 'react-helmet';
import CSSModules from 'react-css-modules';

import styles from './NotFound.scss';

const NotFound = () => (
  <div styleName="root">
    <Helmet title="Oops" />
    <p>Oops, Page was not found!</p>
  </div>
);

export default CSSModules(NotFound, styles);
