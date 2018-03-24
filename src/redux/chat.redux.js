import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://127.0.0.1:80')

// 获取聊天列表
const MSG_LIST = 'MSG_LIST'
// 读取信息
const MSG_RECV = 'MSG_RECV'
// 标志已读
const MSG_READ = 'MSG_READ'

const initState = {
  chatmsg: [],   // from或to是当前登录用户的所有消息的列表
  users: {},     // 所有用户{id:{name,avatar}}形式的数据
  unread: 0     //  未读信息总的条数
}

export function chat(state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return {...state,
        users:action.payload.users,
        chatmsg:action.payload.msgs,
        unread:action.payload.msgs.filter(v=>!v.read && v.to === action.payload.userid).length
        }
    case MSG_RECV:
      // 此条消息发送给该用户的未读消息数才会加一
      const n = action.payload.to === action.userid ? 1 : 0
      console.log('action.payload',action.payload)
      // 消息列表加上此条消息，改变消息未读数
      return {...state, chatmsg:[...state.chatmsg,action.payload], unread:state.unread+n}
    case MSG_READ:
      const {from,num} = action.payload
      console.log(from, state.chatmsg)
      return {...state,
        chatmsg: state.chatmsg.map(v=>{
          if(from === v.from) {
            v.read = true
          }
          return v
        }),
        unread: state.unread - num }
    default:
      return state
  }
}
// msg为发送的消息，userid为当前用户id
function msgRecv(msg, userid) {
  return {userid, type:MSG_RECV, payload: msg}
}

function msgList(msgs,users,userid) {
  return {type:MSG_LIST,payload:{msgs,users,userid}}
}

function msgRead({from,userid,num}) {
  return {type: MSG_READ,payload: {from,userid,num}}
}

/*------------------------------------action-------------------------------------*/

// from为我聊天的对象，需要把他发给我的消息变成已读,下面函数改写为await形式，
export function readMsg(from) {
  return async (dispatch,getState)=>{
      const res = await axios.post('/user/readmsg',{from})
      const userid = getState().user._id
      console.log(from+'   '+userid)
      if(res.status===200 && res.data.code===0) {
        console.log(from+'   '+userid)
        dispatch(msgRead({userid,from,num: res.data.num}))
      }
  }
}

// 用在chat.js中，监听接收消息
export function recvMsg() {
  return (dispatch,getState) => {
    socket.on('recvmsg',function (data) {
      console.log('recvmsg，收到服务器的触发的消息',data)
      const userid = getState().user._id   // 当前登录的用户
      dispatch(msgRecv(data, userid))
    })
  }
}
// 发送消息
export function sendMsg({from, to, msg}) {
  return dispatch=>{
    socket.emit('sendmsg',{from,to,msg})
  }
}

// 返回数据：msgs为请求用户所有关联(from或to是该用户)的消息，users为所有的用户{id:{name,avatar}}形式,userid为当前登录用户
export function getMsgList() {
  return (dispatch,getState)=>{
    axios.get('/user/getmsglist')
      .then(res=>{
        if(res.status===200 && res.data.code===0) {
          // getState()获取state状态
          // console.log('getstate', getState())
          const userid = getState().user._id   // 当前登录的用户id
          // console.log('查询到的users',res)
          // msgs为请求用户所有关联(from或to是该用户)的消息，users为所有的用户{id:{name,avatar}}形式,userid为当前登录用户
          dispatch(msgList(res.data.msgs,res.data.users,userid))
          console.log(res.data.users)
        } else {
          console.log('出错了',res.data.msgs)
        }
      })
  }
}
