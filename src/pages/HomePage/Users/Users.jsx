import PropTypes from 'prop-types';
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import _isEmpty from 'lodash/isEmpty';

import { FETCH_USERS } from 'models/users/actions';
import { usersSelector } from 'models/users/selectors';

import createAction from 'utils/createAction';
import UserList from './UsersList';

@connect(
  state => ({ users: usersSelector(state) }),
  { onFetchUsers: createAction(FETCH_USERS) }
)
class Users extends PureComponent {
  static propTypes = {
    users: PropTypes.array,
    onFetchUsers: PropTypes.func,
  };

  componentDidMount() {
    const { onFetchUsers, users } = this.props;

    if (_isEmpty(users)) {
      onFetchUsers();
    }
  }

  renderUsersList = () => {
    const { users } = this.props;
    return <UserList list={users} />;
  };

  render() {
    return <Fragment>{this.renderUsersList()}</Fragment>;
  }
}

export default Users;
