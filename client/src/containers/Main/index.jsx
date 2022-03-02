import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import {NavBar} from 'antd-mobile'
import {
  AppOutline,
  MessageOutline,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons'
import Cookies from 'js-cookie'
import {connect} from 'react-redux'
import LaobanInfo from '../LaobanInfo';
import DashenInfo from '../DashenInfo';
import {getRedirection} from '../../utils'
import {getUserAsyncAction} from '../../redux/actions/userActions'
import Laoban from '../Laoban'
import Dashen from '../Dashen'
import Message from '../Message'
import Personal from '../Personal'
import NotFound from '../../components/NotFound'
import NavFooter from '../../components/NavFooter';
import Chat from '../Chat';
import './index.css'


class Main extends Component {
  navList = [
    {
    path: '/laoban', // 路由路径
    component: Laoban,
    title: 'Genius List',
    icon: <AppOutline/>,
    text: 'Genius',
    },
    {
    path: '/dashen', // 路由路径
    component: Dashen,
    title: 'Boss List',
    icon: <UnorderedListOutline/>,
    text: 'Boss',
    },
    {
    path: '/message', // 路由路径
    component: Message,
    title: 'Message List',
    icon: <MessageOutline/>,
    text: 'Message',
    },
    {
      path: '/personal', // 路由路径
      component: Personal,
      title: 'User Center',
      icon: <UserOutline/>,
      text: 'User',
      }
  ]
  componentDidMount() {
    const userid = Cookies.get('userid')
    const {_id} = this.props.user
    if (userid && !_id){
      // console.log('send ajax to get corresponding user');
      this.props.getUserAsyncAction()
    }
  }
  render() {
    const userid = Cookies.get('userid')
    if (!userid){
      return <Redirect to='/login'/>
    }
    const {_id, type, avatar} = this.props.user
    if (!_id){
      return null
    }
    let path = this.props.location.pathname
    if (path === '/'){
        path = getRedirection(type, avatar)
        return <Redirect to={path}/>
    }

    const {navList} = this
    const navPath = this.props.location.pathname
    const curNav = navList.find((nav) => {
       return nav.path === navPath
    })
    if (curNav){
      if (type === 'laoban'){
        navList[1].hide = true
      }else {
        navList[0].hide = true
      }
    }
    const unReadMsg = this.props.unReadMsg
    return (
      <div className='main-container'>
        {curNav ?<NavBar back={null} className='nav'>{curNav.title}</NavBar> : null}
        <Switch>
          {
            navList.map((nav) => {
              return <Route key={nav.path} path={nav.path} component={nav.component}></Route>
            })
          }
          <Route path='/laobaninfo' component={LaobanInfo}></Route>
          <Route path='/dasheninfo' component={DashenInfo}></Route>
          <Route path='/chat/:userid' component={Chat}/>
          <Route component={NotFound}></Route>
        </Switch>
        {curNav ? <NavFooter navList={navList} unReadMsg={unReadMsg}/>: null}
      </div>
    )
    
  }
}

export default connect(
  state => ({user: state.user, unReadMsg:state.msgList.unReadMsg}),
  {getUserAsyncAction}
)(Main)