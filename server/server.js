const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const app = express()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')

// work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)

// io是全局的请求，里面的socket是当前得到请求
io.on('connection',function (socket) {
  // console.log('user login')
  socket.on('sendmsg',function (data) {
    const {from,to,msg} = data
    // 更根据发送接收的用户id生成消息的唯一列表
    const chatid = [from,to].sort().join('_')
    Chat.create({chatid,from,to,content:msg},function (err, doc) {
      console.log('doc._doc',doc)
      // 这里也是执行一次
      io.emit('recvmsg',Object.assign({},doc._doc))
    })
  })
})

const userRouter = require('./user')

app.use(cookieParser())      // cookies相关的配置
app.use(bodyParser.json())   // 解析post过来的json数据
app.use('/user',userRouter)
app.use(function (req, res, next) {
  if(req.url.startsWith('/user')||req.url.startsWith('/static/')) {
    return next()
  }
  return res.sendFile(path.resolve('build/index.html'))
})
app.use('/',express.static(path.resolve('build')))
server.listen(80,function () {
    console.log('Node app start at port 80')
})
