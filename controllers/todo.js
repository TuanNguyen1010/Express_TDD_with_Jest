const todoModel = require('../model/todo')

exports.createToDo = async (req, res, next) => {
  try {
  const createdModel = await todoModel.create(req.body)
  res.status(201).json(createdModel)
  } catch (err) {
    next(err);
  }
}

exports.getToDo = async (req, res, next) => { 
  try {
  const allToDo = await todoModel.find({})
  res.json(allToDo)
  } catch (err) {
    next(err);
  }
}