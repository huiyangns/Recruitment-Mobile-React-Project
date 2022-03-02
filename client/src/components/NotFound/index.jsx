import React, { Component } from 'react';
import {Button} from 'antd-mobile'

export default class NotFound extends Component {
  render() {
    return <div>
        <h2>您访问的界面不存在，请返回首页</h2>
        <Button color='primary' onClick={evt => this.props.history.replace('/')}>首页</Button>
    </div>;
  }
}
