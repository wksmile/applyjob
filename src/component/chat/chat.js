import React from 'react'
import {List,InputItem, NavBar,Icon,Grid} from 'antd-mobile'
// import io from 'socket.io-client'
import {connect} from 'react-redux'

import {getMsgList,sendMsg,recvMsg,readMsg} from '../../redux/chat.redux'
import {getChatId} from '../../util'
import QueueAnim from 'rc-queue-anim'

// const socket = io('ws://localhost:9093') 通过redux去通信

@connect(
  state=>state,
  {getMsgList,sendMsg,recvMsg,readMsg}
)
class Chat extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      text:'',
      showEmoji: false
    }
    this.handleSumbit = this.handleSumbit.bind(this)
  }
  componentDidMount(){   // 进入该页面获取用户信息
    if(!this.props.chat.chatmsg.length) {
      this.props.getMsgList()    // 获取所有用户的{id:{name,avatar}}形式，当前用户的所有相关消息，未读消息数
      this.props.recvMsg()       // 开始监听
    }
    this.fixCarouse()
  }
  // 离开页面时清除消息条数
  componentWillUnmount(){
    // 获取聊天对象id
    const to = this.props.match.params.user
    console.log(to)
    this.props.readMsg(to)
  }
  fixCarouse(){   // 修复grid组件的bug
    setTimeout(function () {   // 手动派发事件让emoji显示正常
      window.dispatchEvent(new Event('resize'))
    },0)
  }
  handleSumbit(){
    console.log('hahahaha')
    //socket.emit('sendmsg',{text: this.state.text})
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from,to,msg})
    this.setState({text:''})
  }
  render(){
    const emoji = '🤔 😂 😍 😊 😀 😁 😂 🤣 😃 😅 😊 😋 😎 😐 😝 😖 😰 😞 🤑 😧 👿 👵 👨 😾 🤖 🤡 😳 🤤 😏 😑 😋 😴 🙁 😱 😦 😕 😴 😑 😊 😗 😚 😑'.split(' ').filter(v=>v).map(v=>({
      text: v
    }))
    // 当前聊天用户的id
    const userid = this.props.match.params.user
    // console.log(this.props.match.params.user)
    // 应为这里connect是state=>state所以要加上chat.users，若state=>state.chat,可以写成this.props.users
    // users为所有用户{id:{name,avatar}}形式的数据
    const users = this.props.chat.users
    // console.log('users',users)
    if(!users[userid]) return null      // 获取不到聊天用户id返回null
    const chatid = getChatId(userid, this.props.user._id)   // 当前聊天的id
    // chatmsg是from或to是当前登录用户的所有消息的列表，得到当前用户与对应用户聊天的消息
    const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid===chatid)
    // console.log('chatmsgs',chatmsgs)
    return (
      <div id='chat-page'>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.props.history.goBack()
          }}
        >
          {users[userid].name}
        </NavBar>
        <QueueAnim delay={100}>
        {chatmsgs.map(v=>{
          // 聊天对象的头像
          const avatar = require(`../img/${users[v.from].avatar}.jpg`)
          // 判断是对方发的消息还是自己发的，显示在不同的边
          return v.from === userid ? (
          <List key={v._id}>
            <List.Item
              thumb={avatar}>
              {v.content}
            </List.Item>
          </List>
          ) : (
            <List key={v._id+'0'}>
              <List.Item className="chat-me" extra={<img src={avatar} alt="" />}>
                {v.content}
              </List.Item>
            </List>
          )
        })}
        </QueueAnim>
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.text}
              onChange={v=>{
                this.setState({text:v})
              }}
              extra={
                <div>
                  <span style={{marginRight:15}} onClick={()=>{
                    this.setState({showEmoji:!this.state.showEmoji})
                    this.fixCarouse()
                  }} role="img" aria-label="send emoji">🤔</span>
                  <span onClick={this.handleSumbit}>发送</span>
                </div>
              }
            >信息</InputItem>
          </List>
          {this.state.showEmoji
            ? <Grid
            data={emoji}
            columnNum={9}
            carouselMaxRow={4}
            isCarousel={true}
            onClick={el=>{
              this.setState({
                text: this.state.text + el.text
              })
            }
            }
          /> : null}
        </div>
      </div>
    )
  }
}

export default Chat
