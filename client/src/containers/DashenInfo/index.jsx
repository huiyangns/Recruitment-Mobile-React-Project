import React, { Component } from 'react';
import {NavBar, List, Input, Space, Button, TextArea} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import AvatarSelector from '../../components/AvatarSelector'
import {connect} from 'react-redux'
import {updateAsyncAction} from '../../redux/actions/userActions'
import './index.css'

class DashenInfo extends Component {
    state = {
        avatar: '',
        post: '',
        info: ''
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
        <div className='DashenInfo-container'>
            <NavBar back={null} className='nav'>Silicon Valley Recruitment</NavBar>
            <Space/>
            <AvatarSelector handleAvatar={this.handleAvatar}></AvatarSelector>
            <Space/>
            <List>
                <Space direction='vertical' className='verticalSpace'>
                    <List.Item prefix='Position：'>
                        <Input placeholder='Applied position' clearable onChange={val => this.handleInput('post', val)}/>
                    </List.Item>
                    <List.Item prefix='Infomation：'>
                        <TextArea placeholder="Personal profile" rows={3} onChange={val => this.handleInput('info', val)}></TextArea>
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
)(DashenInfo)