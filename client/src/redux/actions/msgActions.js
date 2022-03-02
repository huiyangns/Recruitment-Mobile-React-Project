import io from "socket.io-client";
import {reqMsgList, reqMsgRead} from '../../api/index'
import {RECEIVE_MSG_LIST, RECEIVE_MSG, READ_MSG} from '../action-types'

const socketSymbol = Symbol("socket");

const msgListAction = (msgList,userid) => ({type:RECEIVE_MSG_LIST, data:{msgList, userid}})
const msgAction = (chatMsg, userid) => ({type: RECEIVE_MSG, data:{chatMsg, userid}})
const readMsgAction = (count, from, to) => ({type:READ_MSG, data:{count, from, to}})

function initIO(dispatch, userid) {
  if (!io[socketSymbol]) {
    const socket = io("ws://localhost:4000");
    io[socketSymbol] = socket;
  }

  io[socketSymbol].on("receiveMsg", function (data) {
    console.log("browser receives msg:", data);
    if (data.from === userid || data.to === userid) {
      dispatch(msgAction(data, userid))
    }
  });
}

export async function getMsgList(dispatch, userid){
    initIO(dispatch, userid);
    const response = await reqMsgList()
    const result = response.data
    if(result.code === 0) {
        dispatch(msgListAction(result.data, userid))
    }
}
export const sendMsgAsyncAction = ({ from, to, content }) => {
  return (dispatch) => {
    
    io[socketSymbol].emit("sendMsg", { from, to, content });
    console.log("browser send msg to server:", { from, to, content });
  };
};

export const readMsgAsyncAction = (from, to) => {
  return async dispatch => {
    const response = await reqMsgRead(from)
    const result = response.data
    console.log('readMsgAsyncAction', result.data);
    dispatch(readMsgAction(result.data, from, to))
  } 
}