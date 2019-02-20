
import React from 'react';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import Helmet from 'react-helmet';
import { hot } from 'react-hot-loader';

import '_styles/normalize.scss';
import logo from '_images/logo.svg';

import styles from './App.scss';
import config from '../config';

const App = ({ route }) => (
  <div styleName="app">
    <Helmet {...config.app} />
    <div styleName="header">
      <img src={logo} alt="logo" role="presentation" />
      <h1>{config.app.title}</h1>
    </div>
    <hr />
    {/* child routes won't render without this */}
    {renderRoutes(route.routes)}
  </div>
);

App.propTypes = {
  route: PropTypes.object,
};

export default hot(module)(CSSModules(App, styles));
