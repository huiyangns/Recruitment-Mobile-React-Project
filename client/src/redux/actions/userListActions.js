import {RECEIVE_USERLIST} from '../action-types'
import {reqUserList} from '../../api/index'

const userListAction = (userList) => ({type:RECEIVE_USERLIST, data:userList})

export const userListAsyncAction = (type) => {
    return async (dispatch) => {
         const response = await reqUserList(type)
         const result = response.data
         if (result.code === 0){
             dispatch(userListAction(result.data))
         }
    } 
}