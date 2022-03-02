import React, { Component } from 'react';
import {NavBar, List, Input, Space, Radio, Button } from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {registerAsyncAction, clearMsgAction} from '../../redux/actions/userActions'
import Logo from '../../components/Logo'
import './index.css'

class Register extends Component {
  state = {
    username:'',
    password:'',
    repassword:'',
    type:'dashen'
  }
  handleInput = (name, val) => {
     this.setState({[name]:val})
     if (this.props.user.msg) {
       this.props.clearMsgAction('')
     }
     
  }
  register = () => {
    // console.log(this.state); 
    this.props.registerAsyncAction(this.state)
  }
  render() {
    const {type} = this.state
    const {msg, redirectTo} = this.props.user
    if (redirectTo){
      return <Redirect to={redirectTo}/>
    }
    return (
      <div className='register-container'>
        <NavBar back={null} className='nav'>Silicon Valley Recruitment</NavBar>
        <Logo></Logo>
        <Space/>
        <List>
          <Space direction='vertical'>
          {msg? <List.Item className='errMsg'>{msg}</List.Item> : null}
          <List.Item prefix='Username'>
              <Input placeholder='username' minLength={1} clearable onChange={val => this.handleInput('username', val)}/>
          </List.Item>
          <List.Item prefix='Password'>
              <Input placeholder='password' clearable type='password' onChange={val => this.handleInput('password', val)}/>
          </List.Item>
          <List.Item prefix='ConfirmPass'>
              <Input placeholder='Confirm Password' clearable type='password' onChange={val => this.handleInput('repassword', val)}/>
          </List.Item>
          <List.Item prefix='User-Type'>
              <Radio.Group
                value={type}
                onChange={(val) => {
                  //  console.log(val);
                   this.handleInput('type', val)
                }}
              >
                <Space>
                  <Radio value='dashen'>Genius</Radio>
                  <Radio value='laoban'>Boss</Radio>
                </Space>
            </Radio.Group>
          </List.Item>
          </Space>
          
      </List>
      <Space/>
      <Button block color='primary' size='large' onClick={this.register}>Register</Button>
      <Space/>
      <Button block size='large' onClick={evt => this.props.history.replace('/login')}>Has an account?</Button>
      
      </div>
    );
  }
}

export default connect(
  state => ({user: state.user}),
  {registerAsyncAction, clearMsgAction}
)(Register)