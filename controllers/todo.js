const todoModel = require('../model/todo')

exports.createToDo = (req, res, next) => {
  const createdModel = todoModel.create(req.body)
  res.status(201).json(createdModel)
}