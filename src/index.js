import React from 'react'
import ReactDom from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'

import Login from './container/login/login'
import Register from './container/register/register'
import reducer from './reducer'
import './config';

const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : f=>f

const store = createStore(reducer,compose(
  applyMiddleware(thunk),    // 使用thunk中间件
  reduxDevtools
))   //  开启中间件

ReactDom.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
      </div>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
)