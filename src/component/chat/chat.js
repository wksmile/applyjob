import React from 'react'
import {List,InputItem, NavBar,Icon,Grid} from 'antd-mobile'
import io from 'socket.io-client'
import {connect} from 'react-redux'

import {getMsgList,sendMsg,recvMsg} from '../../redux/chat.redux'
import {getChatId} from '../../util'

const socket = io('ws://localhost:9093')

@connect(
  state=>state,
  {getMsgList,sendMsg,recvMsg}
)
class Chat extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      text:'',
      showEmoji: false
    }
  }
  componentDidMount(){   // 进入该页面获取用户信息
    if(!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
    this.fixCarouse()
  }
  fixCarouse(){
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
    const emoji = '🤷 🤷 😄🤷🏻🤷🏻🤷🏻🤷🏻 🤷 🤷 😄🤷🏻🤷🏻🤷🏻🤷🏻 🤷 🤷 😄🤷🏻🤷🏻🤷🏻🤷🏻 🤷 🤷 😄🤷🏻🤷🏻🤷🏻🤷🏻 🤷 🤷 😄🤷🏻🤷🏻🤷🏻 🤷'.split(' ').filter(v=>v).map(v=>({
      text: v
    }))
    const userid = this.props.match.params.user
    console.log(this.props.match.params.user)
    const users = this.props.chat.users
    if(!users[userid]) return null      // 获取不到用户id返回null
    const chatid = getChatId(userid, this.props.user._id)   // 当前聊天的id
    const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid===chatid)
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
        {chatmsgs.map(v=>{
          const avatar = require(`../img${users[v.from].avatar}.png`)
          return v.from === userid ? (
          <List key={v._id}>
            <List.Item
              thumb={avatar}
            >
              {v.content}
            </List.Item>
          </List>
          ) : (
            <List key={v._id}>
              <List.Item class="chat-me" extra={<img src={avatar} />}>
                {v.content}
              </List.Item>
            </List>
          )
        })}
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
                  }}>😄🤷🏻🤷🏻🤷🏻🤷🏻</span>
                  <span onClick={()=>this.handleSumbit()}>发送</span>
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
