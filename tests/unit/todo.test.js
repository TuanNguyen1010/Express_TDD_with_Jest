const ToDoController = require('../../controllers/todo')
const ToDoModel = require('../../model/todo')
const httpMocks = require('node-mocks-http')
const toDoMocks = require('../mocks/toDoMock')

ToDoModel.hello = jest.fn()

describe('ToDoController.createToDo', () => {
  it('should have a createToDo function', () => {
    expect(typeof ToDoController.createToDo).toBe('function')
  })
  it('should call the todo model from controller', () => {
    let req, res, next;
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
    req.body = toDoMocks;
    ToDoController.createToDo(req, res, next)
    expect(ToDoModel.hello).toBeCalledWith(toDoMocks)
  })
} )