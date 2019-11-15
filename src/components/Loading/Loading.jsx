import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import useRendered from 'hooks/useRendered';

const Loading = ({ fetching, delay, children }) => {
  const rendered = useRendered();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (rendered && !fetching) {
      if (delay) {
        setTimeout(() => {
          setShowContent(true);
        }, delay);
      } else {
        setShowContent(true);
      }
    }
  }, [delay, fetching, rendered]);

  const renderChildren = useCallback(
    () => (typeof children === 'function' ? children() : children),
    [children]
  );

  return showContent ? renderChildren() : <div>... Loading</div>;
};

Loading.propTypes = {
  delay: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
  fetching: PropTypes.bool,
};

Loading.defaultProps = {
  fetching: false,
  delay: 0,
};

export default Loading;
