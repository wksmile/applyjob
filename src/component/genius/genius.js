import React from 'react'
import UserCard from '../usercard/usercard'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'

@connect(
  state=>state.chatuser,
  {getUserList}
)
class Genuis extends React.Component{
  componentDidMount() {
    this.props.getUserList('genuis')
  }
  render(){
    return <UserCard userlist={this.props.userlist}/>
  }
}

export default Genuis

