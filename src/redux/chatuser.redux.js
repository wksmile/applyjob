import axios from 'axios'

const USER_LIST = 'USER_LIST'

const initState = {
  userlist: []    // boss或genuins类型下的所有用户的列表
}

export function chatuser(state = initState, action) {
  switch(action.type){
    case USER_LIST:
        return {...state, userlist:action.payload}
    default:
      return state
  }
}

export function userList(arr) {
  // obj为boss或genuins类型下的所有用户的列表，过滤掉列表中的所有用户的pwd字段
  const data = arr.map(v=>{
    const {pwd,...data} = v
    return data
  })
  console.log('res.data filter',data)
  return {type:USER_LIST, payload: data}
}

export function getUserList(type) {
  return dispatch => {
    axios.get('/user/list?type='+type)
      .then(res=>{
        if(res.data.code===0){
          console.log('res.data',res.data.data);
          dispatch(userList(res.data.data))
        }
      })
  }
}
