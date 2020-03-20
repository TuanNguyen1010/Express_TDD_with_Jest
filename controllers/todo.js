const todoModel = require('../model/todo')

exports.createToDo = async (req, res, next) => {
  const createdModel = await todoModel.create(req.body)
  res.status(201).json(createdModel)
}