const mongoose = require('mongoose')


const todoSchema = new mongoose.Schema({ 
  title: {
    type: String,
    required: true 
  }, 
  done: {
    type: Boolean, 
    require: true
  }
})

module.exports = mongoose.model('todo', todoSchema)