import axios from 'axios'
import {getRedirectPath} from '../util'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'

const initState = {
  redirectTo: '',   // 登陆后的页面跳转链接
  isAuth: false,
  msg: '',
  user: '',
  type: ''
}
// reducer
export function user(state=initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {...state, msg:'', redirectTo:getRedirectPath(action.payload), isAuth:true, ...action.payload}
    case LOGIN_SUCCESS:
      return {...state, msg:'', redirectTo:getRedirectPath(action.payload), isAuth:true, ...action.payload}
    case ERROR_MSG:
      return {...state, isAuth:false, msg:action.msg}
    case LOAD_DATA:
      return {...state, ...action.payload}
    default:
      return state
  }
}

function registerSuccess(data) {
  return {type: REGISTER_SUCCESS, payload: data}
}

function loginSuccess(data) {
  return {type:LOGIN_SUCCESS,payload:data}
}

// 对象简写的形式应该放在前面
function errorMsg(msg) {
  return {msg, type:ERROR_MSG}
}

export function loadData(userinfo) {
  return {type:LOAD_DATA,payload:userinfo}
}

export function login({user, pwd}) {
  if(!user || !pwd) {
    return errorMsg('用户密码必须输入')
  }
  return dispatch => {    // 异步的操作返回函数，手动用dispatch触发状态改变
    axios.post('/user/login',{
      user,pwd
    }).then(res=>{
      if(res.status==200&&res.data.code===0) {
        dispatch(loginSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

export function register({user, pwd, repeatpwd, type}) {
  if(!user||!pwd||!type) {
    return errorMsg('用户密码必须输入')
  }
  if(pwd!==repeatpwd) {
    return errorMsg('两次输入的密码不一致')
  }

  return dispatch => {    // 异步的操作返回函数，手动用dispatch触发状态改变
    axios.post('/user/register',{
      user,pwd,type
    }).then(res=>{
      if(res.status==200&&res.data.code===0) {
        dispatch(registerSuccess({user,pwd,type}))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }

}
