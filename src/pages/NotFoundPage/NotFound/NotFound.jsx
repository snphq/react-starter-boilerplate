import React from 'react';
import { Helmet } from 'react-helmet-async';

import styles from './NotFound.scss';

const NotFound = () => (
  <div className={styles.root}>
    <Helmet title="Oops" />
    <p>Oops, Page was not found!</p>
  </div>
);

export default NotFound;
