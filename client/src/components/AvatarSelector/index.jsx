import React, { Component } from 'react';
import {List, Grid, Space} from 'antd-mobile'
import {nanoid} from 'nanoid'
import './index.css'

export default class AvatarSelector extends Component {
  state = {
    avatar: null
  }
  constructor(props) {
    super(props)
    this.avatars = []
    for (let i = 0; i < 20; i++){
      this.avatars.push(
        {
          title:`avatar${i+1}`,
          icon: require(`../../assets/images/avatar${i+1}.png`)
        }
      )
    }
  }

  setAvatar = (evt) => {
     let index = evt.target.getAttribute('index')
     this.setState({avatar: this.avatars[index].icon})
     this.props.handleAvatar(this.avatars[index].title)
  }
  render() {
    let prompt = !this.state.avatar? (
      <div>
        <p>Choose an avatar</p>
      </div>
      ): (
      <div>
        <span>Avatar choosen：</span>
        <img src={this.state.avatar} alt="avatar" style={{verticalAlign:'middle'}}/>
      </div>
    )
    return (
      <List header={prompt} className='avatarList'>
        <Grid columns={5}>
          {
            this.avatars.map((avatar, i) => {
               return (
                    <div key={nanoid()} onClick={this.setAvatar} index={i}>
                      <Space direction='vertical' className='avatarverticalSpace'>
                        <img src={avatar.icon} alt='avatar' className='avatarSelect' index={i} style={{marginBottom:0}}/>
                        <span style={{fontSize:14}} index={i}>{avatar.title}</span>
                      </Space>
                    </div>
                
               )
            })
          }
        </Grid>
      </List>
    )
  }
}
