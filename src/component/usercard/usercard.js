import React from 'react'
import PropTypes from 'prop-types'
import {Card,WingBlank} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

import '../../index.css'

@withRouter
class UserCard extends React.Component{
  // 父组件传进来的所有boss或genuis的用户列表
  static propTypes = {
    userlist: PropTypes.array.isRequired
  }

  handleClick(v){
    console.log('enter chat',v)
    // url中v._id是聊天的对象id，不是用户自己的id，v为聊天对象user模型的信息
    this.props.history.push(`/chat/${v._id}`)
  }

  render() {
    // console.log('userlist',this.props.userlist)
    return (
      <WingBlank>
        {this.props.userlist.map(v => (
          // 用户存在头像说明已经完善了用户的信息，才会在列表显示
          v.avatar ?
            <Card
              className="index100"
              onClick={()=>this.handleClick(v)}
              key={v._id}>
              <Card.Header
                title={v.user}
                thumb={require(`../img/${v.avatar}.jpg`)}
                extra={<span>{v.title}</span>}
                thumbStyle={{height: 40}}
              />
              <Card.Body>
                {v.type==='boss'?<div>公司：{v.company}</div>:null}
                {v.desc.split('\n').map(d =>
                  <div key={d}>{d}</div>
                )}
                {v.type==='boss'?<div>薪资：{v.money}</div>:null}
              </Card.Body>
            </Card> : null
        ))}
      </WingBlank>
    )
  }
}

export default UserCard
