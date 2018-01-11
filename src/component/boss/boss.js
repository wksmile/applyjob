import React from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'

@connect(
  state=>state.chatuser,
  {getUserList}
)
class Boss extends React.Component{
  componentDidMount() {
    // 得到boss的所有user模型下得到信息，除了pwd外
    this.props.getUserList('boss')
  }
  render(){
    return <UserCard userlist={this.props.userlist}/>
  }
}

export default Boss
