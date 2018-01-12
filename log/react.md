## react原理

#### 虚拟dom

shouldComponentUpdate可以性能优化setState状态改变

在render中不要直接使用setState,因为setState会调用render，这样会导致循环，setState是异步更新组件的状态

### react动画解决方案

- css动画 VS javascript动画
- ReactCSSTransitionGroup
- Ant Motion

让后端支持es6语法需要用到babel-cli包，需要面的babel-node

让后端支持前端的jsx语法，在工程目录下创建.babelrc文件，把package.json文件中关于babel的配置放到.babelrc文件中就可以。

可以通过ReactDOMServer（https://doc.react-china.org/docs/react-dom-server.html）在服务器端渲染jsx然后可以直接返回前端页面显示
