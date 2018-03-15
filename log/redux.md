# redux learn

需要看视屏12-3到12-12学习redux原理

 - Redux专注于状态管理，和react解耦
 - 单一状态，单向数据流
 - 核心概念：store,state,action,reducer
 
 需要加上subscribe让状态改变后重渲染在页面上，否则状态改变后页面显示内容不变

redux-thunk插件处理异步,redux默认只处理同步，使用applyMiddleware开启thunk中间件，然后action可以返回函数(异步的操作)，使用dispatch提交action
   
redux-devtools-extension调试
    
    import {createStore, applyMiddleware, compose} from 'redux'  // 导入compose可以连接多个中间件
    import thunk from 'redux-thunk'  // 异步状态管理中间件
    import {counter,addGun,removeGun,addGunAsync} from './index.redux'
    
    const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : f=>f   // 浏览器redux调试工具，
    
    const store = createStore(counter,compose(   // 建立状态
      applyMiddleware(thunk),    // 使用thunk中间件
      reduxDevtools     // 开启redux调试工具
    ))   //  开启中间件

react-redux包优雅连接react和redux

    import {Provider} from 'react-redux'
    
    ReactDom.render(
      (<Provider store={store}>
        <App />
      </Provider>),
      document.getElementById('root')
    )  // 全局传入store，不再需要将组件定义在函数中，store.subscribe(render)不再需要监听
    
    // 在组件中导入connect连接状态和函数绑定组件
    import React from 'react'
    import {connect} from 'react-redux'
    import {addGun, removeGun, addGunAsync} from './index.redux'
    
    const mapStateToProps = (state) => {
      return {num:state}
    }
    const actionCreators = {
      addGun, removeGun, addGunAsync
    }
    App = connect(mapStateToProps, actionCreators)(App)
    
connect可以用装饰器的方式来书写，使用**eject**包自动弹出配置的装置来弹出配置，npm run eject，
然后在package.json中babel中增加["transform-decorators-legacy"]配置，然后在组件中通过如下方式导入状态和方法

    @connect(         // 放在组件上方
      state => ({num:state}),    // 需要的属性
      {addGun, removeGun, addGunAsync}   //  需要的方法
    )
    
复杂redux应用，多个reducer，用combineReducers合并    
    看完12-2