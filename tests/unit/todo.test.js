const ToDo = require('../../controllers/todo')

describe('ToDo.createToDo', () => {
  it('should have a createToDo function', () => {
    expect(typeof ToDo.createToDo).toBe('function')
  })

} )