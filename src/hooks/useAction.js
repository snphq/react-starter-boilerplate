import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default type => {
  const dispatch = useDispatch();

  const handler = useCallback((payload = {}) => dispatch({ type, payload }), [
    dispatch,
    type,
  ]);

  return handler;
};
