import {combineReducers} from 'redux'
import user from './userReducer'
import userList from './userListReducer'
import msgList from './msgReducer'

export default combineReducers({
    user,
    userList,
    msgList
})