const todoModel = require('../model/todo')

exports.createToDo = (req, res, next) => {
  todoModel.hello(req.body)
}