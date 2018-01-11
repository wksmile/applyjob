import React from 'react'
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'

@connect(
  state=>state
)
class Msg extends React.Component{
  getLast(arr){
    return arr[arr.length-1]
  }
  render(){
    // console.log(this.props)
    const msgGroup = {}   //  按照聊天给用户分组
    // console.log(this.props.user)
    // this.props.user为当前登录用户的信息
    const userid = this.props.user._id
    // this.props.chat.users为所有用户{id:{name,avatar}}形式的数据
    const userinfo = this.props.chat.users
    // this.props.chat.chatmsg是from或to是当前登录用户的所有消息的列表
    this.props.chat.chatmsg.forEach(v=>{
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      // 将当前登录用户的所有聊天信息按聊天对象分组
      msgGroup[v.chatid].push(v)
    })
    // console.log(msgGroup)
    // 按照最近发送的消息在列表的最上面进行排序，chatList按照时间给msgGroup分组
    const chatList = Object.values(msgGroup)
      .sort((a,b)=>{
        const a_last = this.getLast(a).create_time
        const b_last = this.getLast(b).create_time
        return b_last - a_last
      })

    return (
      <div>
        <List>
          {chatList.map(v=> {
            // console.log(v)
            // 得到与聊天对象的最后一条聊天信息
            const lastItem = this.getLast(v)
            // 得到聊天对象的id
            const targetId = v[0].from === userid ? v[0].to : v[0].from
            // 得到每个聊天对象未读的消息数
            const unreadNum = v.filter(v=>!v.read && v.to===userid).length
            if(!userinfo[targetId]) return null
            return <List.Item
              extra={<Badge text={unreadNum} />}
              key={lastItem._id}
              thumb={require(`../img/${userinfo[targetId].avatar}.jpg`)}
              arrow="horizontal"
              onClick={()=>{
                this.props.history.push(`/chat/${targetId}`)
              }}>
                {lastItem.content}
              <List.Item.Brief>{userinfo[targetId].name}</List.Item.Brief>
            </List.Item>
          })}
        </List>
      </div>
    )
  }
}

export default Msg
