import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchUserInfo } from '_actions';
import { currentUserSelector } from '_selectors';

import UserCard from './UserCard';

@connect(
  state => ({ userInfo: currentUserSelector(state) }),
  { onFetchUserInfo: fetchUserInfo },
)

@withRouter

class UserInfo extends PureComponent {
  static propTypes = {
    userInfo: PropTypes.object,
    onFetchUserInfo: PropTypes.func,
    match: PropTypes.object,
  };

  componentDidMount() {
    const { onFetchUserInfo, match: { params } } = this.props;
    onFetchUserInfo(params.id);
  }

  renderUserCard = () => {
    const { userInfo } = this.props;
    return <UserCard {...userInfo} />;
  }

  render() {
    return (
      <Fragment>
        {this.renderUserCard()}
      </Fragment>
    );
  }
}

export default UserInfo;
