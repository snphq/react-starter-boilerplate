import React, { Fragment } from 'react';
import Helmet from 'react-helmet';

import Examples from './Examples';

const LocalizationPage = () => (
  <Fragment>
    <Helmet title="Localization" />
    <Examples />
  </Fragment>
);

export default LocalizationPage;
