import React, { Component } from 'react';
import {NavBar, List, Input, Space, Button } from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {loginAsyncAction,clearMsgAction} from '../../redux/actions/userActions'
import Logo from '../../components/Logo'
import './index.css'

class Login extends Component {
  state = {
    username:'',
    password:''
  }
  handleInput = (name, val) => {
     this.setState({[name]:val})
     this.props.clearMsgAction('')
  }
  login = () => {
    // console.log(this.state); 
    this.props.loginAsyncAction(this.state)
    
  }
  render() {
    const {msg, redirectTo} = this.props.user
    if (redirectTo){
      return <Redirect to={redirectTo}/>
    }
    return (
      <div className='login-container'>
        <NavBar back={null} className='nav'>Silicon Valley Recruitment</NavBar>
        <Logo></Logo>
        <Space/>
        <List>
          <Space direction='vertical'>
          {msg? <div className='errMsg'>{msg}</div> : null}
          <List.Item prefix='Username'>
              <Input placeholder='username' clearable onChange={val => this.handleInput('username', val)}/>
          </List.Item>
          <List.Item prefix='Password'>
              <Input placeholder='password' clearable type='password' onChange={val => this.handleInput('password', val)}/>
          </List.Item>
          </Space>
          
      </List>
      <Space/>
      <Button block color='primary' size='large' onClick={this.login}>Login</Button>
      <Space/>
      <Button block size='large' onClick={evt => this.props.history.replace('/register')}>No account?</Button>
      
      </div>
    );
  }
}

export default connect(
  state => ({user: state.user}),
  {loginAsyncAction,clearMsgAction}
)(Login)