import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

import styles from './NotFound.scss';

const NotFound = () => (
  <Fragment>
    <Helmet title="Oops" />
    <div className={styles.root}>
      <p>Oops, Page was not found!</p>
    </div>
  </Fragment>
);

export default NotFound;
