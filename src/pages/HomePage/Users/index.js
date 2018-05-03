import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import UserList from './UsersList';
import { usersSelector } from '_selectors';
import { fetchUsers } from '_actions/users';

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
    } = this.props;

    onFetchUsers();
  }

  renderUsersList = () => {
    const { users } = this.props;
    return <UserList list={users} />;
  };

  render() {
    console.log('I\'m rendering');
    return (
      <div>
        {this.renderUsersList()}
      </div>
    );
  }
}

export default Users;
