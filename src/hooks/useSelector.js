import { useSelector } from 'react-redux';

export default (func, params = {}) => useSelector(state => func(state, params));
