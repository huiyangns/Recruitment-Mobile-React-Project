import React, { Component } from 'react';
import {List, Badge, Image} from 'antd-mobile'
import {connect} from 'react-redux'
import './index.css'

class Message extends Component {
  getLastMsgs = (chatMsgs, userid) => {
     let lastMsgsObjs = {}
     for (let msg of chatMsgs){
       if (msg.to === userid && !msg.read) {
         msg.unReadCount = 1
       }else {
         msg.unReadCount = 0
       }
       if (!lastMsgsObjs[msg.chat_id]){
          lastMsgsObjs[msg.chat_id] = msg
       }else {
         let unReadCount = lastMsgsObjs[msg.chat_id].unReadCount + msg.unReadCount
         if(msg.create_time > lastMsgsObjs[msg.chat_id].create_time){
          lastMsgsObjs[msg.chat_id] = msg
         }
         lastMsgsObjs[msg.chat_id].unReadCount = unReadCount
       }
     }
    let lastMsgs = Object.values(lastMsgsObjs)
    lastMsgs.sort(function(m1, m2) {
       return m2.create_time - m1.create_time
    })
    return lastMsgs
  }
  render() {
    const {user, msgList:{users, chatMsgs}} = this.props
    let lastMsgs = this.getLastMsgs(chatMsgs, user._id)
    return (
      <div className='message-container'>
        <List>
        {lastMsgs.map(msg =>{ 
          let targetid = msg.to === user._id ? msg.from : msg.to
          let targetUser = users[targetid]
          return (
        <List.Item
          key={msg.chat_id}
          prefix={
            <Image
              src={require(`../../assets/images/${targetUser.avatar}.png`)}
              fit='cover'
            />
          }
          onClick={() => this.props.history.push(`/chat/${targetid}`)}
          extra={<Badge content={msg.unReadCount}/>}
          description={targetUser.username}
        >
          {msg.content}
        </List.Item>
        )})}
        </List>
      </div>
    )
  }
}

export default connect(
    state => ({user:state.user, msgList: state.msgList}),
    {}
)(Message)