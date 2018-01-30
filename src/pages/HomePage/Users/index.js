import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  fetchUsers,
} from '_actions/users';

import UserList from './UsersList';

class Users extends PureComponent {
  componentDidMount() {
    this.props.fetchUsers();
  }

  renderUsersList = () => {
    const { users } = this.props;
    return <UserList list={users} />;
  };

  render() {
    return (
      <div>
        {this.renderUsersList()}
      </div>
    );
  }
}

Users.propTypes = {
  users: PropTypes.array,
  fetchUsers: PropTypes.func,
};

const mapStateToProps = state => ({
  users: state.users.list,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    fetchUsers,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Users);
