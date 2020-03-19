const ToDoController = require('../../controllers/todo')
const ToDoModel = require('../../model/todo')

ToDoModel.create = jest.fn()

describe('ToDoController.createToDo', () => {
  it('should have a createToDo function', () => {
    expect(typeof ToDoController.createToDo).toBe('function')
  })
  it('should call the todo model from controller', () => {
    ToDoController.createToDo()
    expect(ToDoModel.create).toBeCalled()
  })
} )