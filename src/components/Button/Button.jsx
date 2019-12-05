import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.scss';

const colors = {
  red: '#f14e4e',
  yellow: '#f1bb4e',
};

const Button = ({ children, color }) => (
  <button style={{ backgroundColor: colors[color] }} className={styles.root}>
    {children}
  </button>
);

Button.propTypes = {
  color: PropTypes.oneOf(['red', 'yellow']),
  children: PropTypes.string,
};

Button.defaultProps = {
  color: 'red',
  children: '',
};

export default Button;
