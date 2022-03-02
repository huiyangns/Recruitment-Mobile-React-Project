import {RECEIVE_MSG_LIST, RECEIVE_MSG, READ_MSG} from '../action-types'
const initialMsgList = {
    users:{},
    chatMsgs:[],
    unReadMsg:0
}
export default function msgReducer(state=initialMsgList, action) {
    const {type, data} = action
    switch (type) {
        case RECEIVE_MSG_LIST:
            return {
                users: data.msgList.users,
                chatMsgs: data.msgList.chatMsgs,
                unReadMsg:data.msgList.chatMsgs.reduce((preTotal, cur) => preTotal + (cur.to===data.userid&&!cur.read?1:0) ,0)
            }
        case RECEIVE_MSG:
            return {
                users: state.users,
                chatMsgs: [...state.chatMsgs, data.chatMsg],
                unReadMsg:state.unReadMsg + (data.chatMsg.to===data.userid&&!data.chatMsg.read?1:0)
            }
        case READ_MSG:
            return {
                users: state.users,
                chatMsgs: 
                    state.chatMsgs.map((msg) => {
                         if (msg.from === data.from && msg.to === data.to && !msg.read){
                             return {...msg, read:true}
                         }
                         return msg
                    })
                ,
                unReadMsg:state.unReadMsg - data.count
            }
        default:
            return state
    }
}