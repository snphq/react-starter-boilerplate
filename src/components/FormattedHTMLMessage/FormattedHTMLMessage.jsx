/* eslint-disable object-curly-newline */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _isEmpty from 'lodash/isEmpty';

import _template from 'lodash/template';

import { messagesSelector } from '_selectors';

@connect(
  state => ({
    messages: messagesSelector(state),
  }),
  null,
)

class FormattedMessage extends PureComponent {
  getFormattedMessage() {
    const { messages, values, id } = this.props;
    const message = messages[id];

    if (!messages[id]) {
      throw new Error(`Can't find message for id = ${id}`);
    }

    const isInterpolatedString = this.isInterpolatedString(message);
    const valuesProvided = values || !_isEmpty(values);

    if (!isInterpolatedString || !valuesProvided) {
      return message;
    }

    const interpolate = _template(message);
    return interpolate(values);
  }

  handleMessageAsInterpolatedString = (values, message) => {
    const interpolate = _template(message);
    return interpolate(values);
  }

  isInterpolatedString = str => /\${[A-Za-z0-9_-]*}/g.test(str);

  render() {
    const message = this.getFormattedMessage();
    /* eslint-disable react/no-danger */
    return (
      <span dangerouslySetInnerHTML={message} />
    );
  }
}

FormattedMessage.propTypes = {
  id: PropTypes.string,
  messages: PropTypes.array,
  values: PropTypes.object,
};

export default FormattedMessage;
