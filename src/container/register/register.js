import React from 'react'
import {List,InputItem,Radio,WhiteSpace,Button} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import Logo from '../../component/logo/logo'
import {connect} from 'react-redux'
import {register} from '../../redux/user.redux'

@connect(
  state=>state.user,
  {register}
)
class Register extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      user:'',
      pwd:'',
      repeatpwd:'',
      type: 'genuis'   // boss
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
  }
  handleChange(key,val){
    this.setState({
      [key]:val
    })
  }
  handleRegister(){
    this.props.register(this.state)
  }
  render(){
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} />:null }
        <Logo/>
        <h2>注册页</h2>
        <List>
          {this.props.msg ? <p className="error-msg">{this.props.msg}</p>:null}
          <InputItem
            onChange={v=>this.handleChange('user',v)}
          >用户名</InputItem>
          <WhiteSpace/>
          <InputItem
            type="password"
            onChange={v=>this.handleChange('pwd',v)}
          >密码</InputItem>
          <WhiteSpace/>
          <InputItem
            type="password"
            onChange={v=>this.handleChange('repeatpwd',v)}
          >确认密码</InputItem>
          <WhiteSpace/>
          <RadioItem
            checked={this.state.type==='genuis'}
            onChange={()=>this.handleChange('type','genuis')}
          >牛人</RadioItem>
          <WhiteSpace/>
          <RadioItem
            checked={this.state.type==='boss'}
            onChange={()=>this.handleChange('type','boss')}
          >Boss</RadioItem>
          <WhiteSpace/>
          <Button
            onClick={this.handleRegister}
          >注册</Button>
        </List>
      </div>
      )
  }
}

export default Register
