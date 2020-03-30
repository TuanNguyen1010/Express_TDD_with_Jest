const ToDoController = require('../../controllers/todo')
const ToDoModel = require('../../model/todo')
const httpMocks = require('node-mocks-http')
const createToDoMock = require('../mocks/createToDoMock')
const toDoMock = require('../mocks/toDoMock')

ToDoModel.create = jest.fn()
ToDoModel.find = jest.fn()
ToDoModel.findById = jest.fn()

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
})

describe('ToDoController.getToDobyId', () => {
  it('should have getToDoById function', () => {
    expect(typeof ToDoController.getToDoById).toBe('function')
  })

  it('should call the findById method on todo Model', async () => {
    req.params.todoId = '5e81349fa145485171733cd1'
    await ToDoController.getToDoById(req, res, next)
    expect(ToDoModel.findById).toBeCalledWith('5e81349fa145485171733cd1')
  })

  it('should return json body and status code 200', async () => {
    ToDoModel.findById.mockReturnValue(toDoMock)
    await ToDoController.getToDoById(req, res, next)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toStrictEqual(toDoMock) 
    expect(res._isEndCalled()).toBeTruthy();
  })
})

describe('ToDoController.getToDo', () => {

  it('should have getToDo function', () => {
    expect(typeof ToDoController.getToDo).toBe('function')
  })
  it('should call the find method on todo Model', async () => {
    await ToDoController.getToDo(req, res, next);
    expect(ToDoModel.find).toHaveBeenCalledWith({})
  })
  it('return response with status 200', async () => {
    ToDoModel.find.mockReturnValue(toDoMock)
    await ToDoController.getToDo(req, res, next)
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(toDoMock)    
  })
  it('should be able to handle error message', async () => {
    const errorMessage = { message: "Unable to find any toDo list" };
    const rejectPromise = Promise.reject(errorMessage)
    ToDoModel.find.mockReturnValue(rejectPromise)
    await ToDoController.getToDo(req, res, next);
    expect(next).toBeCalledWith(errorMessage)
  })
})

describe('ToDoController.createToDo', () => {

  beforeEach(() => {
    req.body = createToDoMock;
  })

  it('should have a createToDo function', () => {
    expect(typeof ToDoController.createToDo).toBe('function')
  })
  it('should call the create method from todo model', () => {
    ToDoController.createToDo(req, res, next)
    expect(ToDoModel.create).toBeCalledWith(createToDoMock)
  })
  it('should return a status code of 201', async () => {
    await ToDoController.createToDo(req, res, next)
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy()
  })
  it('should return Json body in response', async () => {
    ToDoModel.create.mockReturnValue(createToDoMock);
    await ToDoController.createToDo(req, res, next);
    expect(res._getJSONData()).toStrictEqual(createToDoMock)
  })
  it('should be able to handle error message', async () => {
    const errorMessage = { message: "Done property missing" };
    const rejectPromise = Promise.reject(errorMessage)
    ToDoModel.create.mockReturnValue(rejectPromise)
    await ToDoController.createToDo(req, res, next);
    expect(next).toBeCalledWith(errorMessage)
  })
} )