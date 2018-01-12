import React from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import {Switch,Route,Redirect} from 'react-router-dom'
import NavLinkBar from '../navlink/navlink'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import User from '../user/user'
import Msg from '../msg/msg'
import {getMsgList,recvMsg} from '../../redux/chat.redux'
//import Login from '../../container/login/login'
// import QueueAnim from 'rc-queue-anim'

import '../../index.css'

@connect(
  state=>state,
  {getMsgList,recvMsg}
)
class Dashboard extends React.Component {
  componentDidMount(){
    if(!this.props.chat.chatmsg.length) {
      this.props.getMsgList()    // 获取所有用户的{id:{name,avatar}}形式，当前用户的所有相关消息，未读消息数
      this.props.recvMsg()       // 开始监听
    }
  }
  render() {
    const {pathname} = this.props.location
    const user = this.props.user
    // 下面的几个点击路由
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Genius,
        hide:user.type==='genuis'
      },
      {
        path: '/genius',
        text: 'boss',
        icon: 'job',
        title: 'BOSS列表',
        component: Boss,
        hide:user.type==='boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      },
    ]
    const path = ['/boss','/genius','/msg','/me']
    // console.log('pathname',pathname)
    // path.indexOf(pathname)
    return path.indexOf(pathname)>-1 ? (
      <div>
        <NavBar className="fixd-header" mode="dark">{navList.find( v => v.path==pathname).title}</NavBar>
        <div style={{marginTop:45}}>
          <Switch>
            {navList.map(v=> (
                <Route key={v.path} path={v.path} component={v.component}/>
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList}/>
      </div>
      ) : <Redirect to="login"/>
  }
}

export default Dashboard
