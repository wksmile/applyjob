import React from 'react'
import ReactDom from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'
import reducer from './reducer'
import './config'

const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : f=>f

const store = createStore(reducer,compose(
  applyMiddleware(thunk),    // 使用thunk中间件
  reduxDevtools
))   //  开启中间件

// boss genius me msg 4个页面
ReactDom.render(   // switch只会命中一个路由，命中一个后面就不会渲染，dashboard相当于默认页面，可有写404页面
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute></AuthRoute>
        <Switch>
          <Route path="/bossinfo" component={BossInfo} />
          <Route path="/geniusinfo" component={GeniusInfo}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/chat/:user" component={Chat}/>
          <Route component={Dashboard}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
)