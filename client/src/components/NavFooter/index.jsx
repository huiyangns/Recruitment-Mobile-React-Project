import React, { Component } from 'react';
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import './index.css'

class NavFooter extends Component {
  render() {
      let {navList, unReadMsg} = this.props
      navList = navList.filter((nav) => {
           return !nav.hide
      })
      const path = this.props.location.pathname
    return (
        
        <div className='navfooter-container'>
            <TabBar activeKey={path} onChange={value => this.props.history.replace(value)}>
                {navList.map(item => (
                    <TabBar.Item key={item.path} icon={item.icon} title={item.text} badge={item.path==='/message'?unReadMsg:null}/>
                ))}
            </TabBar>
        </div>
    )
  }
}

export default withRouter(NavFooter)