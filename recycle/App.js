import React from 'react'
import {connect} from 'react-redux'
import {addGun, removeGun, addGunAsync} from './index.redux'

// const mapStateToProps = (state) => {
//   return {num:state}
// }
//
// const actionCreators = {
//   addGun, removeGun, addGunAsync
// }
// App = connect(mapStateToProps, actionCreators)(App)

// 用装饰器修改了导入方式
@connect(
  state => ({num:state.counter}),    // 需要的属性
  {addGun, removeGun, addGunAsync}   //  需要的方法
)
class App extends React.Component {
  render() {
    return (
    <div>
      <h1>now is num {this.props.num}</h1>
      <button onClick={this.props.addGun}>申请武器</button>
      <button onClick={this.props.removeGun}>回收武器</button>
      <button onClick={this.props.addGunAsync}>拖两天</button>
    </div>
    )
  }
}

export default App;