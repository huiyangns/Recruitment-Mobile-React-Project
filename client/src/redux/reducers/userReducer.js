import { AUTH_SUCCESS, ERROR_MSG, CLEAR_ERROR_MSG, RECEIVE_USER, RESET_USER  } from "../action-types";
import { getRedirection } from "../../utils";

const initUser = {
     username:'',
     type:'',
     msg:'',
     redirectTo:''
}
export default function userReducer(state=initUser, action){
     const {type, data} = action
     switch (type) {
          case AUTH_SUCCESS:
               return {...data, redirectTo:getRedirection(data.type, data.avatar)}
          case ERROR_MSG:
               return {...state, msg: data}
          case CLEAR_ERROR_MSG:
               return {...state, msg: ''}
          case RECEIVE_USER:
               return data
          case RESET_USER:
               return {...initUser, msg: data}
          default:
               return state
     }
    
}