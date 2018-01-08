// 重定向连接地址
export function getRedirectPath({type,avatar}) {
  // 根据用户信息返回用户的跳转地址
  // user.type /boss /genius
  // user.avatar /bossinfo /geniusinfo
  let url = (type==='boss') ? '/boss' : '/genius'
  if (!avatar) {
    url += 'info'
  }
  return url
}