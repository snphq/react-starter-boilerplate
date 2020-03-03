import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Loading from 'components/Loading';

import styles from './UserCard.scss';

const UserCard = ({ item, fetching, fetched }) => (
  <div className={styles.root}>
    <Loading active={fetching} disabled={fetched}>
      {() => (
        <Fragment>
          <h4>User Card</h4>
          <ul>
            <li>Name: {item.name}</li>
            <li>Phone: {item.phone}</li>
            <li>Email: {item.email}</li>
            <li>Website: {item.website}</li>
          </ul>
        </Fragment>
      )}
    </Loading>
  </div>
);

UserCard.propTypes = {
  fetched: PropTypes.bool,
  fetching: PropTypes.bool,
  item: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    website: PropTypes.string,
  }),
};

UserCard.defaultProps = {
  fetched: false,
  fetching: false,
  item: null,
};

export default UserCard;
