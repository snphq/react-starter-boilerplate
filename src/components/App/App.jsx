
import React from 'react';
import { compose } from 'redux';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import config from '_config';
import browserHOC from '_hocs/browser';

import AppRouter from '_components/AppRouter';
import '_styles/normalize.scss';
import logo from '_images/logo.svg';
import styles from './App.scss';

const App = ({ routes, browser }) => {
  console.log('browser', browser);

  return (
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
};

App.propTypes = {
  routes: PropTypes.array,
  browser: PropTypes.object,
};

export default compose(
  browserHOC,
  Component => CSSModules(Component, styles),
)(App);
