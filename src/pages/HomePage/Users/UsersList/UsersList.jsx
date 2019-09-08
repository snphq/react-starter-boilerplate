import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './UsersList.scss';

const UsersList = ({ list }) => (
  <div className={styles.root}>
    <h3>Users List</h3>
    <ul>
      {list.map(user => (
        <li key={user.id}>
          <Link to={`/users/${user.id}`}>{user.name}</Link>
        </li>
      ))}
    </ul>
  </div>
);

UsersList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
};

UsersList.defaultProps = {
  list: [],
};

export default UsersList;
