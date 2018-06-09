module.exports = {
  getIndexJsFileText: name =>
    `export { default } from './${name}';\n`,

  getMainJsFileText: (name, type) => {
    console.log('type', type);
    switch (type) {
      case 'container':
      case 'page':
        return (
`import React, { Component } from 'react';
import { connect } from 'react-redux';
import selectors from '_selectors';
import { action } from '_actions';

class ${name} extends Component {
  state ={

  }

  handle = (e) => {

  }

  render() {

    return (
      <div className={styles.root}>
        ${name}
      </div>
    );
  }
}

const {
  isMobileSelector,
} = selectors;

const mapStateToProps = (state) => {
  return {
    filterValue: state.visibilityFilter,
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    onChangeFilter: (value) => {
      dispatch(action(value));
    }
  };
};

export default connect(mapStateToProps, mapDispatchProps)(${name});`
        );

      default:
        return (
          `import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

import styles from './${name}.scss';

const ${name} = ({ className }) => (
  <div className={className} styleName="root">
    ${name}
  </div>
);

${name}.propTypes = {
  className: PropTypes.string
};
export default CSSModules(${name}, styles, { allowMultiple: true });`
        );
    }
  },

  getMainStyleFileText: () =>
    `.root {\n\n}`,
};
