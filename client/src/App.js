import React, { Component } from 'react';
import {HashRouter,Switch, Route} from 'react-router-dom'
import { Provider } from 'react-redux';
import Main from './containers/Main';
import Login from './containers/Login';
import Register from './containers/Register';
import store from './redux/store';
import './App.css'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <Switch>
            <Route path='/register' component={Register}></Route>
            <Route path='/login' component={Login}></Route>
            <Route component={Main}></Route>
          </Switch>
        </HashRouter>
      </Provider>
        
    )
    
  }
}
