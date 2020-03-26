const request = require("supertest");
const app = require('../../app.js');
const toDoMock = require("../mocks/createToDoMock.json");
const endpointUrl = "/todos";

describe(endpointUrl, () => {
  it("POST " + endpointUrl, async () => {
    const response = await request(app)
        .post(endpointUrl)
        .send(toDoMock);
      expect(response.statusCode).toBe(201);
      expect(response.body.title).toBe(toDoMock.title);
      expect(response.body.done).toBe(toDoMock.done);
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