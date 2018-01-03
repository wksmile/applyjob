# react-router使用

安装：npm install react-router-dom,dom版本是浏览器端路由

    import {BrowserRouter, Route, Link} from 'react-router-dom'
    
url参数,Route组件参数可用冒号标志参数
Redirect组件跳转,
Switch只渲染一个子Route组件,如果其他的没有命中跳转到Redirect的路由

      <Switch>
        <Route path="/login" component={Auth} />
        <Route path="/dashboard" component={Dashboard} />
        <Redirect to="/dashboard" />  // 如果其他的没有命中跳转到dashboard的路由
      </Switch>
