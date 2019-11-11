import PropTypes from 'prop-types';
import React from 'react';

import styles from './UserCard.scss';

const UserCard = ({ name, phone, email, website }) => (
  <div className={styles.root}>
    <h4>User Card</h4>
    <ul>
      <li>Name: {name}</li>
      <li>Phone: {phone}</li>
      <li>Email: {email}</li>
      <li>Website: {website}</li>
    </ul>
  </div>
);

UserCard.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  website: PropTypes.string,
};

UserCard.defaultProps = {
  name: '',
  phone: '',
  email: '',
  website: '',
};

export default UserCard;