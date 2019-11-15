import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Loading from 'components/Loading';

import styles from './Users.scss';

const Users = ({ list, fetching }) => (
  <div className={styles.root}>
    <Loading fetching={fetching} delay={1000}>
      <h3>Users</h3>
      <ul>
        {list.map(user => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </Loading>
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
