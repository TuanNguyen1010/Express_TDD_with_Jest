const request = require("supertest");
const app = require('../../app.js');
const toDoMock = require("../mocks/toDoMock.json");
const endpointUrl = "/todos/";

describe(endpointUrl, () => {
  it("POST " + endpointUrl, async () => {
    const response = await request(app)
        .post('/todos/')
        .send(toDoMock);
      expect(response.statusCode).toBe(201);
      expect(response.body.title).toBe(toDoMock.title);
      expect(response.body.done).toBe(toDoMock.done);
  })
})