
import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import Helmet from 'react-helmet';
import { hot } from 'react-hot-loader';

import config from '../config';
// Import your global styles here
import 'normalize.css/normalize.css';
import styles from './App.scss';
import logo from '_images/logo.svg';

const App = ({ route }) => (
  <div className={styles.App}>
    <Helmet {...config.app} />
    <div className={styles.header}>
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

export default hot(module)(App);
