import React from 'react'
import {connect} from 'react-redux'
import {List} from 'antd-mobile'

@connect(
  state=>state
)
class Msg extends React.Component{
  render(){
    // console.log(this.props)
    const msgGroup = {}   //  按照聊天给用户分组
    this.props.chat.chatmsg.forEach(v=>{
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    // console.log(msgGroup)
    const chatList = Object.values(msgGroup)
    return (
      <div>
        <List>
          {chatList.map(v=>(
            <List.Item>
              {v[0].from}
            </List.Item>
          ))}
        </List>
      </div>
    )
  }
}

export default Msg
