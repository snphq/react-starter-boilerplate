
import React from 'react';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { hot } from 'react-hot-loader';

import config from '../config';

import AppRouter from '_components/AppRouter';

import '_styles/normalize.scss';
import logo from '_images/logo.svg';
import styles from './App.scss';

const App = ({ routes }) => (
  <div styleName="app">
    <Helmet {...config.app} />
    <div styleName="header">
      <img src={logo} alt="logo" role="presentation" />
      <h1>{config.app.title}</h1>
    </div>
    <hr />
    <AppRouter routes={routes} />
  </div>
);

App.propTypes = {
  routes: PropTypes.array,
};

export default hot(module)(CSSModules(App, styles));
