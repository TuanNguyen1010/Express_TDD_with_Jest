const todoModel = require('../model/todo')

exports.createToDo = () => {
  todoModel.create()
}