import ajax from "./ajax";

//register request sent to server
export const reqRegister = (userInfo) => ajax('register', userInfo, 'post')
//login request sent to server
export const reqLogin = (userInfo) => ajax('login', userInfo, 'post')
//update user info request sent to server
export const reqUpdateUser = (userInfo) => ajax('update', userInfo, 'post')
//get user info from user by using cookie
export const reqUser = () => ajax('user')
//get all users whose type is different from current client
export const reqUserList = (type) => ajax('userlist', {type})
//get all msgs from server
export const reqMsgList = () => ajax('msglist')
//set msg state as read
export const reqMsgRead = (from) =>ajax('msgread', {from}, 'post')