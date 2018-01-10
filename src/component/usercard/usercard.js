import React from 'react'
import PropTypes from 'prop-types'
import {Card,WingBlank} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

@withRouter
class UserCard extends React.Component{
  static propTypes = {
    userlist: PropTypes.array.isRequired
  }

  handleClick(v){
    console.log('enter chat',v)
    console.log('-----')
    this.props.history.push(`/chat/${v._id}`)
  }

  render() {
    const styleCard = {height: 40}
    console.log('userlist  tt',this.props.userlist)
    return (
      <WingBlank>
        {this.props.userlist.map(v => (
          v.avatar ?
            <Card
              style={{zIndex:100}}
              onClick={()=>this.handleClick(v)}
              key={v._id}>
              <Card.Header
                title={v.user}
                thumb={require(`../img/${v.avatar}.jpg`)}
                extra={<span>{v.title}</span>}
                thumbStyle={styleCard}
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
