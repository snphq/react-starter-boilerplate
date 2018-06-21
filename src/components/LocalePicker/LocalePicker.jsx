import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

import styles from './LocalePicker.scss';

const LocalePicker = ({ locale, onChangeLocale }) => (
  <div onClick={onChangeLocale} styleName="root">
    <span styleName="locale">{locale}</span>
  </div>
);

LocalePicker.propTypes = {
  locale: PropTypes.string,
  onChangeLocale: PropTypes.func,
};

export default CSSModules(LocalePicker, styles);
