import React from 'react';
import PropTypes from 'prop-types';
/* import { Helmet } from 'react-helmet'; */

import config from 'config';

import AppRouter from 'components/AppRouter';
import RotateScreen from 'components/RotateScreen';
import 'styles/normalize.scss';
import logo from 'images/logo.svg';
import styles from './App.scss';
import useBrowser from 'hooks/useBrowser';

const App = ({ routes }) => {
  const browser = useBrowser();

  if (RUNTIME_ENV === 'client') {
    console.info('browser', browser);
  }

  return (
    <>
      <RotateScreen />
      <div className={styles.app}>
        {/* Use Helmet only in SPA mode. Render app head on server side  */}
        {/* <Helmet {...config.app} /> */}
        <div className={styles.header}>
          <img src={logo} alt="logo" role="presentation" />
          <h1>{config.app.title}</h1>
        </div>
        <hr />
        <AppRouter routes={routes} />
      </div>
    </>
  );
};

App.propTypes = {
  routes: PropTypes.array.isRequired,
};

export default App;
