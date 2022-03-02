import React, { Component } from 'react';
import {connect} from 'react-redux'
import UserList from '../../components/UserList';
import {userListAsyncAction} from '../../redux/actions/userListActions'

class Dashen extends Component {
  componentDidMount() {
    this.props.userListAsyncAction('laoban')
  }
  render() {
    return <UserList userList={this.props.userList}></UserList>;
  }
}

export default connect(
    state => ({userList: state.userList}),
    {userListAsyncAction}
)(Dashen)