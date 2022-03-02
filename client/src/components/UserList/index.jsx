import React, { Component } from 'react';
import {Card, Image} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import './index.css'

class UserList extends Component {
  render() {
      const {userList} = this.props
    return (<div className='userList-container'>
        {
            userList.map((user) => {
                 return (
                     <Card key={user._id} 
                           title={<Image src={require(`../../assets/images/${user.avatar}.png`)}></Image>}
                           extra={user.username} onClick={() => this.props.history.push(`/chat/${user._id}`)}>
                        <div>职位:{user.post}</div>
                        {user.company ? <div>公司:{user.company}</div> : null}
                        {user.company ? <div>月薪:{user.salary}</div> : null}
                        <div>描述:{user.info}</div>
                     </Card>
                 )
            })
        }
    </div>);
  }
}

export default withRouter(UserList)