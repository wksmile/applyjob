import React from 'react'
import Logo from '../../component/logo/logo'
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/user.redux'
import formComp from '../../component/formComp/formComp'

@connect(
  state=>state.user,
  {login}
)
@formComp    // 使用装饰器将handleChange放在了formComp中
class Login extends React.Component{
  constructor(props) {
    super(props)
    // this.state = {
    //   user: '',
    //   pwd: ''
    // }
   // this.handleChange = this.handleChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.register = this.register.bind(this)
  }

  register() {
    this.props.history.push('/register')
  }
  // handleChange(key,val){
  //   this.setState({
  //     [key]:val
  //   })
  // }
  handleLogin(){
    this.props.login(this.props.state)
  }
  render(){
    return (
      <div>
        {(this.props.redirectTo&&this.props.redirectTo!=='/login') ? <Redirect to={this.props.redirectTo} />:null }
        <Logo/>
        <WingBlank>
          <List>
            {this.props.msg ? <p className="error-msg">{this.props.msg}</p>:null}
            <InputItem
              onChange={v=>this.props.handleChange('user',v)}
            >用户名</InputItem>
            <WhiteSpace/>
            <InputItem
              type="password"
              onChange={v=>this.props.handleChange('pwd',v)}
            >密码</InputItem>
          </List>
          <Button type="primary" onClick={this.handleLogin}>登录</Button>
          <WhiteSpace/>
          <Button onClick={this.register} type="primary">注册</Button>
        </WingBlank>
      </div>
      )
  }
}

export default Login
