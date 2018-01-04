const mongoose = require('mongoose');

// 连接
const DB_URL = 'mongodb://localhost:27017/immoc-chat'
mongoose.connect(DB_URL)

const models = {
  user: {
    'user':{type:String, require:true},
    'pwd':{type:String, require:true},
    'type':{type:String, require:true},
    'avatar': {type:String},    //  头像
    'desc':{type:String},   // 个人简介或职位简介
    'title':{type:String},  // 职位名
    'company': {type:String},  // 如果是boss还有company和money字段
    'money':{type:String}
  },
  chat:{

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