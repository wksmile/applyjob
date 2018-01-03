import React from 'react'
import {connect} from 'react-redux'

import {login,getUserData} from './Auth.redux'
import {Redirect} from 'react-router-dom'

// 两个reducers,每个reducers都有一个state
@connect(
  state=>state.auth,
  {login,getUserData}
)
class Auth extends React.Component{
  constructor(props){
    super(props);
    this.state={
      data:{}
    }
  }
  componentDidMount(){
    this.props.getUserData()
  }
  render(){
    return (
        <div>
          <h2>我的名字</h2>
          {this.props.isAuth ? <Redirect to="/dashboard" /> : null}
          <h2>你没有权限，需要登录才能看</h2>
          <button onClick={this.props.login}>登录</button>
        </div>
    )
  }
}

export default Auth
