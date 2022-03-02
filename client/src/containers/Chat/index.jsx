import React, { Component } from 'react';
import {NavBar, List, Input, Image, Grid} from 'antd-mobile'
import {nanoid} from 'nanoid'
import {connect} from 'react-redux'
import {sendMsgAsyncAction, readMsgAsyncAction} from '../../redux/actions/msgActions'
import './index.css'

class Chat extends Component {
    state = {
        content:'',
        isShow: false
    }
    constructor(props) {
        super(props)
        this.emojis = ['😀','😃','😄','😁','😆','😅','🤣','😂','🙂','🙃','😉','😊','😇',
        '🥰','😍','🤩','😘','😗','😚','😙','😋','😛','😜','🤪','😝','🤑','🤗','🤭','🤫','🤔','🤐','🤨']
    }
    componentDidMount() {
        window.scrollTo(0, document.body.scrollHeight)
        this.setState({isShow:false})
    }
    componentDidUpdate() {
        let chatList = document.querySelector('.chatbody')
        if (!chatList){
            return null
        }
        if (this.state.isShow) {
            chatList.className='chatbody showEmoji'
        }else {
            chatList.className='chatbody'
        }
        window.scrollTo(0, document.body.scrollHeight)
    }
    componentWillUnmount(){
        const from = this.props.match.params.userid
        const to = this.props.user._id
        this.props.readMsgAsyncAction(from, to)
    }

    handleInput = (val) => {
         this.setState({content:val})
    }
    toggleShow = () => {
        let isShow = !this.state.isShow
        this.setState({isShow})
    }
    sendMsg = () => {
        const from = this.props.user._id
        const to = this.props.match.params.userid
        const content = this.state.content.trim()
        if (content){
            this.props.sendMsgAsyncAction({from, to, content})
            this.setState({content:'', isShow:false})
            
        }
    }
    handleEmoji = (evt) => {
        if (evt.target.getAttribute('index')) {
        this.setState({content: this.state.content + this.emojis[evt.target.getAttribute('index')]}) 

        }
    }
  render() {
      const myId = this.props.user._id
      const {users, chatMsgs} = this.props.msgList
      
      if (!users[myId]){
          return null
      }
      const friendId = this.props.match.params.userid
      const cid = [myId, friendId].sort().join('_')
      const myRelatedMsgs = chatMsgs.filter((msg) => {
           return msg.chat_id === cid
      })
      let icon = require(`../../assets/images/${users[friendId].avatar}.png`)
    return <div className='chat-container'>
        <NavBar className='nav' onBack={() => this.props.history.goBack()}>{users[friendId].username}</NavBar>
        <List className='chatbody'>
            {
                myRelatedMsgs.map((msg) => {
                     if (msg.from === friendId){
                        return (
                            <List.Item
                                key={nanoid()}
                                prefix={
                                    <Image
                                    src={icon}
                                    fit='cover'
                                    width={40}
                                    height={40}
                                    />
                                }
                                >
                                {msg.content}
                            </List.Item>
                        )
                     }else {
                        return (<List.Item className='myMsg'
                            key={nanoid()}
                            extra='Me' 
                            >
                            {msg.content}
                        </List.Item>)
                     }
                })
            }
            
        </List>
       
        <List className='msgFooter'>
            <List.Item extra={
                <span>
                    <span style={{marginRight:10}} onClick={this.toggleShow}>😄</span>
                    <span onClick={this.sendMsg}>Send</span>
                </span>
                
            }>
                    <Input value={this.state.content} 
                    placeholder='Say something' clearable 
                    onChange={val =>this.handleInput(val)}
                    onFocus={() => this.setState({isShow:false})}
                    />
            </List.Item>
            {
                this.state.isShow ? (
                    <Grid columns={8}>
                        {
                            this.emojis.map((emoji, i) => {
                                return <Grid.Item key={nanoid()} onClick={this.handleEmoji} index={i}>
                                    <span index={i}>{emoji}</span>
                                </Grid.Item>
                            })
                        }
                    </Grid>
                ) : null
            }
        </List>
    </div>;
  }
}

export default connect(
    state => ({user: state.user, msgList: state.msgList}),
    {sendMsgAsyncAction,readMsgAsyncAction}
)(Chat)