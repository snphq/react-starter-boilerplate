import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import cookies from 'js-cookie';

import { setLocale } from '_actions';
import { localeSelector } from '_selectors';

import LocalePicker from './LocalePicker';

@connect(
  state => ({
    locale: localeSelector(state),
  }),
  { onChangeLocale: setLocale },
)

class LocalerPickerContainer extends Component {
  handleLocaleChange = () => {
    const { locale, onChangeLocale } = this.props;
    const newLocale = locale === 'en' ? 'ru' : 'en';

    /* save user locale in cookies */
    cookies.set('locale', newLocale);
    onChangeLocale(newLocale);
  }

  render() {
    const { locale } = this.props;
    return (
      <LocalePicker
        locale={locale}
        onChangeLocale={this.handleLocaleChange}
      />
    );
  }
}

LocalerPickerContainer.propTypes = {
  locale: PropTypes.string,
  onChangeLocale: PropTypes.func,
};

export default LocalerPickerContainer;
