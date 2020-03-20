const ToDoController = require('../../controllers/todo')
const ToDoModel = require('../../model/todo')
const httpMocks = require('node-mocks-http')
const toDoMocks = require('../mocks/toDoMock')

ToDoModel.create = jest.fn()

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
})

describe('ToDoController.createToDo', () => {

  beforeEach(() => {
    req.body = toDoMocks;
  })

  it('should have a createToDo function', () => {
    expect(typeof ToDoController.createToDo).toBe('function')
  })
  it('should call the todo model from controller', () => {
    ToDoController.createToDo(req, res, next)
    expect(ToDoModel.create).toBeCalledWith(toDoMocks)
  })
  it('should return a status code of 201', () => {
    ToDoController.createToDo(req, res, next)
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy()
  })
  it('should return Json body in response', () => {
    ToDoModel.create.mockReturnValue(toDoMocks);
    ToDoController.createToDo(req, res, next);
    expect(res._getJSONData()).toStrictEqual(toDoMocks)
  })
} )