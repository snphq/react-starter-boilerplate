import PropTypes from 'prop-types';
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';

import UserList from './UsersList';
import { usersSelector } from '_selectors';
import { fetchUsers } from '_actions/users';
import _isEmpty from 'lodash/isEmpty';

@connect(
  state => ({ users: usersSelector(state) }),
  { onFetchUsers: fetchUsers },
)

class Users extends PureComponent {
  static propTypes = {
    users: PropTypes.array,
    onFetchUsers: PropTypes.func,
  }

  componentDidMount() {
    const {
      onFetchUsers,
      users,
    } = this.props;

    if (_isEmpty(users)) {
      onFetchUsers();
    }
  }

  renderUsersList = () => {
    const { users } = this.props;
    return <UserList list={users} />;
  };

  render() {
    return (
      <Fragment>
        {this.renderUsersList()}
      </Fragment>
    );
  }
}

export default Users;
