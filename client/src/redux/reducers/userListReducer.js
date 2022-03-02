import {RECEIVE_USERLIST} from '../action-types'


const initialUserList = []
export default function userListReducer(state=initialUserList, action){
    const {type, data} = action
    switch (type) {
        case RECEIVE_USERLIST:
            return data
        default:
            return state
    }
}