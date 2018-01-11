import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {loadData} from '../../redux/user.redux'
import {connect} from 'react-redux'

// 此组件控制路由跳转
@withRouter   // 使组件有props.history属性
@connect(
  null,
  {loadData}
)
class AuthRoute extends React.Component {
  componentDidMount(){
    const publicList = ['/login','/register']
    const pathname = this.props.history.location.pathname
    // 如果是在指定的页面就不会跳转
    if(publicList.indexOf(pathname)>-1) {
      return null
    }
    //
    axios.get('/user/info')
      .then(res=>{
        if(res.status === 200) {
          if(res.data.code === 0) {
            // 有登陆信息返回用户的登录信息
            this.props.loadData(res.data.data)
          } else {
            // 未登录
            this.props.history.push('/login')
          }
          console.log(res.data)
        }
      })
  }

  render() {
    return null
  }
}

export default AuthRoute
