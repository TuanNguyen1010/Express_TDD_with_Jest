const ToDoController = require('../../controllers/todo')
const ToDoModel = require('../../model/todo')
const httpMocks = require('node-mocks-http')
const createToDoMock = require('../mocks/createToDoMock')
const toDoMock = require('../mocks/toDoMock')
const todoId = "5e81349fa145485171733cd1"

ToDoModel.create = jest.fn()
ToDoModel.find = jest.fn()
ToDoModel.findById = jest.fn()
ToDoModel.findByIdAndUpdate = jest.fn()

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
})

describe("ToDoController.findByIdAndUpdate", () => {
  it('have updateToDo funciton', () => {
    expect(typeof ToDoController.updateToDo).toBe("function")
  })
  it("calls the findByID and update method on todo model", async () => {
    req.params.todoId = todoId
    req.body = createToDoMock
    await ToDoController.updateToDo(req, res, next)
    expect(ToDoModel.findByIdAndUpdate).toHaveBeenCalledWith(todoId, createToDoMock, {
      new: true, 
      useFindAndModify: false
    })
  })
  it('returns response code 200', async () => { 
    req.params.todoId = todoId
    req.body = createToDoMock
    ToDoModel.findByIdAndUpdate.mockReturnValue(createToDoMock)
    await ToDoController.updateToDo(req, res, next)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toStrictEqual(createToDoMock) 
    expect(res._isEndCalled()).toBeTruthy();
  }) 
}) 

describe('ToDoController.getToDobyId', () => {
  it('should have getToDoById function', () => {
    expect(typeof ToDoController.getToDoById).toBe('function')
  })

  it('should call the findById method on todo Model', async () => {
    req.params.todoId = todoId
    await ToDoController.getToDoById(req, res, next)
    expect(ToDoModel.findById).toBeCalledWith(todoId)
  })

  it('return json body and status code 200', async () => {
    ToDoModel.findById.mockReturnValue(toDoMock)
    await ToDoController.getToDoById(req, res, next)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toStrictEqual(toDoMock) 
    expect(res._isEndCalled()).toBeTruthy();
  })
  it('shows error message when there is error', async () => {
    const errorMessage = { message: "Unable to find any toDoId" };
    const rejectPromise = Promise.reject(errorMessage)
    ToDoModel.findById.mockReturnValue(rejectPromise)
    await ToDoController.getToDoById(req, res, next);
    expect(next).toBeCalledWith(errorMessage)
  })
  it('returns 404 when unable to find toDoId', async () => {
    ToDoModel.findById.mockReturnValue(null)
    await ToDoController.getToDoById(req, res, next);
    expect(res.statusCode).toBe(404)
    expect(res._isEndCalled).toBeTruthy()
  } )
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