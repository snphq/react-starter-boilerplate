import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './Users.scss';

const Users = ({ list }) => (
  <div className={styles.root}>
    <h3>Users</h3>
    <ul>
      {list.map(user => (
        <li key={user.id}>
          <Link to={`/users/${user.id}`}>{user.name}</Link>
        </li>
      ))}
    </ul>
  </div>
);

Users.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
};

Users.defaultProps = {
  list: [],
};

export default Users;
