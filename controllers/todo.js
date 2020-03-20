const todoModel = require('../model/todo')

exports.createToDo = (req, res, next) => {
  todoModel.create(req.body)
  res.status(201).send()
}