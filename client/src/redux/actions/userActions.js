import { AUTH_SUCCESS, ERROR_MSG,CLEAR_ERROR_MSG, RECEIVE_USER, RESET_USER } from "../action-types";
import {reqRegister, reqLogin, reqUpdateUser, reqUser} from '../../api'
import {getMsgList} from './msgActions'

const authSuccessAction = (user) => ({type:AUTH_SUCCESS, data:user})
const errorMsgAction = (msg) => ({type:ERROR_MSG, data:msg})
export const clearMsgAction = (msg) => ({type:CLEAR_ERROR_MSG, data:msg})
const receiveUserAction = (user) => ({type:RECEIVE_USER, data:user})
export const resetUserAction = (msg) => ({type:RESET_USER, data:msg})

export const registerAsyncAction = (user) => {
    const {username, password, repassword, type} = user
    if (!username){
        return errorMsgAction('username should not be blank')
    }
    if (password !== repassword){
        return errorMsgAction('password should be consistent')
    }
     return async dispatch => {
         const response = await reqRegister({username, password, type})
         const result = response.data
         if (result.code === 0){
            getMsgList(dispatch, result.data._id)
            dispatch(authSuccessAction(result.data))
         }else {
            dispatch(errorMsgAction(result.msg))
         }
         
     }
}

export const loginAsyncAction = (user) => {
    const {username, password} = user
    if (!username){
        return errorMsgAction('username should not be blank')
    }
    if (!password){
        return errorMsgAction('password should not be blank')
    }
    return async dispatch => {
        const response = await reqLogin(user)
        const result = response.data
        if (result.code === 0){
            getMsgList(dispatch, result.data._id)
           dispatch(authSuccessAction(result.data))
        }else {
           dispatch(errorMsgAction(result.msg))
        }
        
    }
}

export const updateAsyncAction = (user) => {
    return async dispatch => {
        const response = await reqUpdateUser(user)
        const result = response.data
        if (result.code === 0) {
            dispatch(receiveUserAction(result.data))
        }else {
            dispatch(resetUserAction(result.msg))
        }
    }
}

export const getUserAsyncAction = () => {
    return async dispatch => {
        const response = await reqUser()
        const result = response.data
        if(result.code === 0){
            getMsgList(dispatch, result.data._id) //async operation
            dispatch(receiveUserAction(result.data))
        }else {
            dispatch(resetUserAction(result.msg))
        }
    } 
}