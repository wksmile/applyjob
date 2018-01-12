// 构建mini的redux

export function createStore(reducer) {
  let currentState = {}
  let currentListeners = []

  function getState() {
    return currentState
  }

  function subscribe(listener) {
    currentListeners.push(listener)
  }

  function dispatch(action) {
    currentState = reducer(currentState,action)
    currentListeners.forEach(v=>v())
    return action
  }

  dispatch({type:'@KAIN/KAIN-REDUX'})
  return {getState, subscribe, dispatch}
}
