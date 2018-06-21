import React from 'react';
import CSSModules from 'react-css-modules';

import FormattedMessage from '_components/FormattedMessage';
import LocalePicker from '_components/LocalePicker';

import styles from './Examples.scss';

const Examples = () => (
  <div styleName="root">
    <header styleName="picker-header">
      <LocalePicker />
    </header>
    <section>
      <div>
        <h3 styleName="heading">Simple translation</h3>
        <FormattedMessage id="message-1" />
      </div>
      <div>
        <h3 styleName="heading">Injecting html values</h3>
        <FormattedMessage id="message-2" values={{ br: <br /> }} />
      </div>
    </section>
  </div>
);

export default CSSModules(Examples, styles);
