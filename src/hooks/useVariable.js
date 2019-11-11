import { useRef, useCallback } from 'react';

export default initialValue => {
  const variable = useRef(initialValue);

  const set = useCallback(value => {
    variable.current = value;
    return value;
  }, []);

  return [variable.current, set];
};
