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
    const userid = this.props.user._id
    const userinfo = this.props.chat.users
    this.props.chat.chatmsg.forEach(v=>{
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    // console.log(msgGroup)
    const chatList = Object.values(msgGroup)
    return (
      <div>
        <List>
          {chatList.map(v=> {
            console.log(v)
            const lastItem = this.getLast(v)
            const targetId = v[0].from === userid ? v[0].to:v[0].from
            const unreadNum = v.filter(v=>!v.read && v.to===userid).length
            if(!userinfo[targetId]) return null
            return <List.Item
              extra={<Badge text={unreadNum} />}
              key={lastItem._id}
              thumb={require(`../img/${userinfo[targetId].avatar}.jpg`)}>
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
