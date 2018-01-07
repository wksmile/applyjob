const mongoose = require('mongoose')

// 连接
const DB_URL = 'mongodb://localhost:27017/immoc-chat'
mongoose.connect(DB_URL)

const models = {
  user: {
    'user':{type:String, require:true},
    'pwd':{type:String, require:true},
    'type':{type:String, require:true},
    'avatar': {type:String},    //  头像
    'desc':{type:String},       // 个人简介或职位简介
    'title':{type:String},      // 职位名
    'company': {type:String},   // 如果是boss还有company和money字段
    'money':{type:String}
  },
  chat:{    // 聊天模型
    'chatid':{type:String,require:true},
    'from':{type:String,require:true},
    'to':{type:String,require:true},
    'read':{type:Boolean,default:false},   // 是否已读，对to才有效，因为from肯定读过
    'content':{type:String,require:true,default:''},
    'create_time':{type:Number,default:(new Date).getTime()},
  }
}

// 注册model中的所有表
for(let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: function (name) {
    return mongoose.model(name)
  }
}