/* eslint-disable object-curly-newline */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _isEmpty from 'lodash/isEmpty';

/* helper lodash methods */
import _values from 'lodash/values';
import _some from 'lodash/some';
import _keys from 'lodash/keys';
import _template from 'lodash/template';
import _uniqueId from 'lodash/uniqueId';

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

    if (!values || _isEmpty(values)) {
      return message;
    }

    const isInterpolatedString = this.isInterpolatedString(message);
    const valuesProvided = values && !_isEmpty(values);

    if (!isInterpolatedString || !valuesProvided) {
      return message;
    }

    if (this.isRichTextValuesObject(values)) {
      return this.handleMessageAsReactElement(values, message);
    }

    return this.handleMessageAsInterpolatedString(values, message);
  }

  handleMessageAsReactElement = (values, message) => {
    const delimiter = '@--@';

    const { elements, tokenizedValues } = _keys(values).reduce((acc, key) => {
      const element = values[key];
      if (React.isValidElement(element)) {
        const token = _uniqueId('element-');
        return {
          elements: {
            ...acc.elements,
            [token]: element,
          },
          tokenizedValues: {
            ...acc.tokenizedValues,
            [key]: `${delimiter}${token}${delimiter}`,
          },
        };
      }
      return acc;
    }, {
      elements: {},
      tokenizedValues: {},
    });

    const interpolate = _template(message);
    const interpolatedValue = interpolate(tokenizedValues);

    const nodes = interpolatedValue.split(delimiter)
      .filter(value => value.length !== 0)
      .map((value) => {
        if (elements[value]) {
          return elements[value];
        }
        return value;
      });

    const children = React.Children.map(nodes, child => child);
    return React.createElement('span', null, children);
  }

  handleMessageAsInterpolatedString = (values, message) => {
    const interpolate = _template(message);
    return interpolate(values);
  }

  isInterpolatedString = str => /\${[A-Za-z0-9_-]*}/g.test(str);

  isRichTextValuesObject = (object) => {
    if (!object || _isEmpty(object)) {
      return false;
    }

    return _some(_values(object), value => React.isValidElement(value));
  }

  render() {
    return (
      <span>
        {this.getFormattedMessage()}
      </span>
    );
  }
}

FormattedMessage.propTypes = {
  messages: PropTypes.array,
  id: PropTypes.string,
  values: PropTypes.object,
};

export default FormattedMessage;
