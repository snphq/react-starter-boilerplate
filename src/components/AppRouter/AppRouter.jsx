import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import NotFoundPage from '_pages/NotFoundPage';

const Router = ({ routes }) => (
  <Switch>
    {routes.map(({ path, exact, component: Component }) => (
      <Route
        key={path}
        exact={exact}
        path={path}
        render={props => <Component {...props} />}
      />
    ))}
    <Route path="*" exact component={NotFoundPage} />
  </Switch>
);

Router.propTypes = {
  routes: PropTypes.array,
};

export default Router;
