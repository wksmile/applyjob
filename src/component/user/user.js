import React from 'react'
import {Redirect,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Result,List,WhiteSpace,Button,Modal} from 'antd-mobile'
import browserCookies from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'

@connect(
  state=>state.user,
  {logoutSubmit}
)
class User extends React.Component{
  constructor(props){
    super(props)
   // this.state = {}
    this.logout = this.logout.bind(this)
  }
  logout(){
    const alertOut = Modal.alert
    alertOut('退出', '确定退出吗?', [
      { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
      { text: '确定', onPress: () => {
        browserCookies.erase('userid')
        this.props.logoutSubmit()
      }},
    ])
  }
  render(){
    // console.log(this.props)
    const props = this.props
    return props.user ? (
      <div>
        <Result
          img={<img src={require(`../img/${props.avatar}.jpg`)} style={{width:50}} alt="" />}
          title={props.user}
          message={props.type==='boss'?props.company:null}
        />
        <List renderHeader={()=>'简介'}>
          <List.Item multipleLine={true}>
            {props.title}
            {props.desc.split('\n').map(v=> (
              <List.Item.Brief key={v}>{v}</List.Item.Brief>
            ))}
            {props.money ? <List.Item.Brief>薪资：{props.money}</List.Item.Brief> : null}
          </List.Item>
        </List>
        <WhiteSpace/>
        {/*-------------------------------issue button is here--------------------------------------------*/}
        <Button type="primary"
                onClick={this.logout}
                style={{zIndex:100}}
        >退出</Button>
        {/*-------------------------------------------------------------------------------------*/}
      </div>
    ) : <Redirect to={props.redirectTo}/>
  }
}

export default User
