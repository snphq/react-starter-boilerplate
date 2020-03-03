import React, { Fragment } from 'react';

import styles from './NotFound.scss';

const NotFound = () => (
  <Fragment>
    <div className={styles.root}>
      <p>Oops, Page was not found!</p>
    </div>
  </Fragment>
);

export default NotFound;
