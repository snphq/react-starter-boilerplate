import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import config from 'config';

import AppRouter from 'components/AppRouter';
import 'styles/normalize.scss';
import logo from 'images/logo.svg';
import styles from './App.scss';

const App = ({ routes }) => (
  <div className={styles.app}>
    <Helmet {...config.app} />
    <div className={styles.header}>
      <img src={logo} alt="logo" role="presentation" />
      <h1>{config.app.title}</h1>
    </div>
    <hr />
    <AppRouter routes={routes} />
  </div>
);

App.propTypes = {
  routes: PropTypes.array,
  browser: PropTypes.object,
};

export default App;
