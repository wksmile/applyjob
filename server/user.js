const express = require('express')
const utils = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const _filter = {'pwd':0,'__v':0}    // {'pwd':0}控制显示的字段，0表示不显示

// Chat.remove({},function (e, d) {
//
// })

Router.get('/list',function (req, res) {
   //User.remove({user:'kain'},function (e, d) {})  // 清除所有用户
  // get参数用query获取，post参数用body获取
  const type = req.query.type
  // 找出boss/genuins类型的所有用户
  User.find({type},function(err, doc) {
    return res.json({code:0,data:doc})
  })
})

// 返回查询chat表中所有from或to都是请求用户的聊天消息
Router.get('/getmsglist',function (req, res) {
  const user = req.cookies.userid
  User.find({},function (e,userdoc) {
    let users = {}
    // User模型表中得到所有用户的信息，得到用户id对应用户的user和avatar两个字段的对象
    userdoc.forEach(v=>{
      users[v._id] = {name:v.user,avatar:v.avatar}
    })
    Chat.find({'$or':[{from:user,to:user}]},function (err, doc) {
      if(err) {
        return res.json({code:1,msgs:'服务器端出错'})
      }
      // msgs为请求用户所有关联的消息，users为所有的用户{id:{name,avatar}}形式
      return res.json({code:0,msgs:doc,users:users})
    })
  })
})

Router.post('/readmsg',function (req, res) {
  const userid = req.cookies.userid
  const {from} = req.body
  Chat.update(
    {from,to:userid},
    {'$set':{read:true}},
    {'multi':true},   // 默认只会修改一行，让修改所有的
    function (err, doc) {
      if(!err) {  //  nModified为修改的行数
        return res.json({code:0,num: doc.nModified})
      }
      return res.json({code:1,msg:'修改失败'})
  })
})

Router.post('/update',function (req, res) {
  const userid = req.cookies.userid
  if(!userid) {
    return json.dumps({code:1})
  }
  const body = req.body   //  更新的数据
  User.findByIdAndUpdate(userid,body,function (err, doc) {
    if(err) return res.json({code:1,msg:'服务器端出错'})
    // 返回用户的用户名user和类型type，并且加上上传的 desc,title,company,money，avatar五个字段，一起返回7个字段
    const data = Object.assign({},{
      user:doc.user,
      type:doc.type
    },body)
    return res.json({code:0,data})
  })
})

Router.post('/login',function (req, res) {
  const {user,pwd} = req.body
  User.findOne({user,pwd:md5Pwd(pwd)},_filter,function (err, doc) {
    if(!doc) {
      return res.json({code:1,msg:'用户名不存在或密码错误'})
    }
    res.cookie('userid', doc._id)     // 设置cookies
    return res.json({code:0,data:doc})   // 登录完成，改变状态
  })
})

Router.post('/register',function (req, res) {
  const {user,pwd,type} = req.body
  User.findOne({user},function (err, doc) {
    if(doc) {
      return res.json({code:1,msg:'用户名重复'})
    }

    const userModel = new User({user,type,pwd:md5Pwd(pwd)})
    userModel.save(function (e, d) {
      if(e) {
        return res.json({code:1,msg:'服务端出错'})
      }
      const {user,type,_id} = d
      res.cookie('userid',_id)
      return res.json({code:0,data:{user}})   // 注册完成，改变状态，返回用户名
    })
  })
})

Router.get('/info',function (req, res) {
  const {userid} = req.cookies
  if(!userid) {
    return res.json({code:1})
  }
  User.findOne({_id:userid},_filter,function (err, doc) {
    if(err) {
      return res.json({code:1,msg:'服务器出错了'})
    }
    if(doc) {
      return res.json({code:0,data:doc})   // 状态0表示登录
    }
  })
})

function md5Pwd(pwd) {
  const salt = 'imooc_is_good_4565!@#YBHU~~'
  return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router

/*
 类似于mysql的表，mongodb里面有文档，字段的概念
const User = mongoose.model('user', new mongoose.Schema({
  user: {type: String, require:true},
  age: {type:Number,require:true}
}))

// 新增数据
User.create({
  user:'imooc',
  age:18
},function (err, doc) {
  if(!err) {
    console.log(doc)
  } else {
    console.log(err)
  }
})


mongoose.connection.on('connected',function () {
  console.log('mongo connect success')
})

app.get('/data',function (req, res) {
  User.find({},function (err, doc) {
    res.json(doc)
  })
})  */
