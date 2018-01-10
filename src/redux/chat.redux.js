import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')

// 获取聊天列表
const MSG_LIST = 'MSG_LIST'
// 读取信息
const MSG_RECV = 'MSG_RECV'
// 标志已读
// const MSG_READ = 'MSG_READ'

const initState = {
  chatmsg: [],   // 信息列表
  users: {},     //
  unread: 0     // 未读信息条数
}

export function chat(state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return {...state,users:action.payload.users,chatmsg:action.payload.msgs,unread:action.payload.msgs.filter(v=>!v.read&&v.to===action.payload.userid).length}
    case MSG_RECV:
      const n = action.payload.to === action.payload.userid ? 1 : 0
      console.log('action.payload',action.payload)
      return {...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unread+n}
    default:
      return state
  }
}

function msgRecv(msg,userid) {
  return {userid,type:MSG_RECV,payload:msg}
}

function msgList(msgs,users,userid) {
  return {type:MSG_LIST,payload:{msgs,users,userid}}
}

export function recvMsg() {
  return (dispatch,getState) => {
    socket.on('recvmsg',function (data) {
      console.log('recvmsg',data)
      const userid = getState().user._id   // 当前登录的用户
      dispatch(msgRecv(data,userid))
    })
  }
}

export function sendMsg({from, to, msg}) {
  return dispatch=>{
    socket.emit('sendmsg',{from,to,msg})
  }
}

export function getMsgList() {
  return (dispatch,getState)=>{
    axios.get('/user/getmsglist')
      .then(res=>{
        if(res.status===200 && res.data.code===0) {
          // console.log('getstate',getState())
          const userid = getState().user._id   // 当前登录的用户
          console.log('查询到的users',res)
          dispatch(msgList(res.data.msgs,res.data.users,userid))
        }
      })
  }
}
