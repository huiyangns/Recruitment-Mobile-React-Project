import React, { Component } from 'react';
import {NavBar, List, Input, Space, Button, TextArea  } from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import AvatarSelector from '../../components/AvatarSelector'
import {connect} from 'react-redux'
import {updateAsyncAction} from '../../redux/actions/userActions'
import './index.css'

class LaobanInfo extends Component {
    state = {
        avatar: '',
        post: '',
        info: '',
        company: '',
        salary: ''
    }
    handleInput = (name, val) => {
         this.setState({[name]: val})
    }
    handleAvatar = (avatar) => {
        this.setState({avatar}) 
    }
    save = () => {
        //  console.log(this.state);
        this.props.updateAsyncAction(this.state)
    }
  render() {
      const {avatar, type} = this.props.user
      if (avatar) {
          let path = type === 'dashen'? '/dashen' : '/laoban'
          return <Redirect to={path}/>
      }
    return (
        <div className='LaobanInfo-container'>
            <NavBar back={null} className='nav'>Silicon Valley Recruitment</NavBar>
            <AvatarSelector handleAvatar={this.handleAvatar}></AvatarSelector>
            <List>
                <Space direction='vertical' className='verticalSpace'>
                    <List.Item prefix='Jobs：'>
                        <Input placeholder='jobs' clearable onChange={val => this.handleInput('post', val)}/>
                    </List.Item>
                    <List.Item prefix='Company：'>
                        <Input placeholder='company' clearable onChange={val => this.handleInput('company', val)}/>
                    </List.Item>
                    <List.Item prefix='Salary：'>
                        <Input placeholder='salary' clearable onChange={val => this.handleInput('salary', val)}/>
                    </List.Item>
                    <List.Item prefix='Requirements：'>
                        <TextArea placeholder="requirements" rows={3} onChange={val => this.handleInput('info', val)}></TextArea>
                    </List.Item>
                </Space>
            </List>
            <Space/>
        <Button block color='primary' size='large' onClick={this.save}>save</Button>
        </div>
    )
  }
}

export default connect(
    state => ({user: state.user}),
    {updateAsyncAction}
)(LaobanInfo)