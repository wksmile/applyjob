const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user')

const app = express()
app.use(cookieParser())
app.use(bodyParser.json())   // 解析post过来的json数据
app.use('/user',userRouter)

app.listen(9093,function () {
    console.log('Node app start at port 9093')
})
