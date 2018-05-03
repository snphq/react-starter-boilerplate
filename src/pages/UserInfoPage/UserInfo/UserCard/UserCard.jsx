import PropTypes from 'prop-types';
import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './UserCard.scss';

const UserCard = (props) => {
  const {
    name,
    phone,
    email,
    website,
  } = props;

  return (
    <div styleName="root">
      <h4>User Card</h4>
      <ul>
        <li>Name: {name}</li>
        <li>Phone: {phone}</li>
        <li>Email: {email}</li>
        <li>Website: {website}</li>
      </ul>
    </div>
  );
};

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

export default CSSModules(UserCard, styles);
