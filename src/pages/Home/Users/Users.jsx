import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './Users.scss';

const Users = ({ list, fetching }) => (
  <div className={styles.root}>
    {fetching ? (
      'Loading...'
    ) : (
      <Fragment>
        <h3>Users - 3213231</h3>
        <ul>
          {list.map(user => (
            <li key={user.id}>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </li>
          ))}
        </ul>
      </Fragment>
    )}
  </div>
);

Users.propTypes = {
  fetching: PropTypes.bool,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
};

Users.defaultProps = {
  fetching: false,
  list: [],
};

export default Users;
