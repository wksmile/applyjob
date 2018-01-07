const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')

// work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)

// io是全局的请求，里面的socket是当前得到请求
io.on('connection',function (socket) {
  console.log('user login')
  socket.on('sendmsg',function (data) {
    const {from,to,msg} = data
    const chatid = [from,to].sort().join('_')
    Chat.create({chatid,from,to,content:msg},function (err, doc) {
      io.emit('recvmsg',Object.assign({},doc._doc))
    })
    // console.log(data)
    // io.emit('recvmsg',data)
  })
})

const userRouter = require('./user')

app.use(cookieParser())      // cookies相关的配置
app.use(bodyParser.json())   // 解析post过来的json数据
app.use('/user',userRouter)

server.listen(9093,function () {
    console.log('Node app start at port 9093')
})
