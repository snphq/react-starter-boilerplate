import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { withRouter } from 'react-router-dom';

import {
  fetchUserInfo,
} from 'actions/users';

import UserCard from './UserCard';

class UserInfo extends PureComponent {
  componentDidMount() {
    const { fetchUserInfo: fetchUserAction, match: { params } } = this.props;
    fetchUserAction(params.id);
  }

  renderUserCard = () => {
    const { userInfo } = this.props;
    return <UserCard {...userInfo} />;
  }

  render() {
    return (
      <div>
        {this.renderUserCard()}
      </div>
    );
  }
}

UserInfo.propTypes = {
  userInfo: PropTypes.object,
  fetchUserInfo: PropTypes.func,
  match: PropTypes.object,
};

const mapStateToProps = state => ({
  userInfo: state.users.current,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    fetchUserInfo,
  }, dispatch);

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(UserInfo);
