const request = require("supertest");
const app = require('../../app.js');
const createToDoMock = require("../mocks/createToDoMock.json");
const endpointUrl = "/todos/";

describe(endpointUrl, () => {
  it("GET" + endpointUrl, async () => {
    const response = await request(app)
      .get(endpointUrl)
    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBeTruthy()
    firstTodo = response.body[0]
  })
  it("GET" + endpointUrl + ":todoId", async () => {
    const response = await request(app)
      .get(endpointUrl + firstTodo._id)
    expect(response.statusCode).toBe(200)
    expect(response.body.title).toBe(firstTodo.title)
    expect(response.body.done).toBe(firstTodo.done)
  })
  it("GET request id does not exist 404 error" + endpointUrl + 'todoId', async () => {
    const response = await request(app)
      .get(endpointUrl + "5e813489ebb50251603430de")
    expect(response.statusCode).toBe(404)
  })

  it("POST " + endpointUrl, async () => {
    const response = await request(app)
      .post(endpointUrl)
      .send(createToDoMock);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(createToDoMock.title);
    expect(response.body.done).toBe(createToDoMock.done);
  })

  it('should return error 500 on malformed data with POST' + endpointUrl,
   async () => {
    const response = await request(app)
    .post(endpointUrl)
    .send({ title: "Missing done property"});
    expect(response.statusCode).toBe(500)
    expect(response.body).toStrictEqual({
      message: 
      "todo validation failed: done: Path `done` is required."})
  })
})