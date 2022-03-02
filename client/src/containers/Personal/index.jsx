import React, { Component } from 'react';
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import { Result, List, Button, Space, Image, Dialog } from 'antd-mobile'
import {resetUserAction} from '../../redux/actions/userActions'

class Personal extends Component {
  logOut = async () => {
    const result = await Dialog.confirm({
      title: 'Logout',
      content:'Are you sure to log out?',
      confirmText:'Confirm',
      cancelText:'Cancel'
    })
    if (result){
      Cookies.remove('userid')
      this.props.resetUserAction()
    }
  }
  render() {
    const {username, avatar, post, info,company,salary} = this.props.user
    return <div style={{paddingTop:20}}>
        <Result
          icon={<Image src={require(`../../assets/images/${avatar}.png`)}/>}
          status='success'
          title={username}
          description={company}
        />
        <List header='Related Information'>
          <List.Item>Position：{post}</List.Item>
          <List.Item>Information：{info}</List.Item>
          {salary ? <List.Item>Salary：{salary}</List.Item> : null}
      </List>
      <Space/>
      <Button block size='large' color='danger' onClick={this.logOut}>Logout</Button>
    </div>
  }
}

export default connect(
    state => ({user:state.user}),
    {resetUserAction}
)(Personal)