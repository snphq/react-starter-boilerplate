/* eslint react-hooks/exhaustive-deps: 0 */

import { useRef, useCallback } from 'react';

export default initialValues => {
  const variable = useRef(initialValues);

  const set = useCallback(value => {
    variable.current = value;
  }, []);

  return [variable.current, set];
};
