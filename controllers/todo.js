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

exports.getToDoById = async (req, res, next) => {
  try {
    const findToDo = await todoModel.findById(req.params.todoId)
    if (findToDo) {
      res.json(findToDo)
      } else {
      res.status(404).send()
    }
  } catch(err) {
    next(err)
  }}

  exports.updateToDo = async (req, res, next) => {
    try {
    const updateToDo = await todoModel.findByIdAndUpdate(
      req.params.todoId, 
      req.body, 
      {
      new: true,
      useFindAndModify: false
    })
    if (updateToDo) {
    res.json(updateToDo)}
    else {
      res.status(404).send()
    }
    } catch(err) {
      next(err)
    }
  }

  exports.delete = () => {}