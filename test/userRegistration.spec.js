const request = require('supertest');
const { SCHEMA_ERROR, DUPLICATED_VALUE_ERROR } = require('../app/errors');
const app = require('../app');
const { userMock } = require('./mocks/user');

describe('POST /users', () => {
  test('It should respond user name with status 201', async () => {
    const response = await request(app)
      .post('/users')
      .send(userMock);
    expect(response.body.name).toBe(userMock.name);
    expect(response.statusCode).toBe(201);
  });

  test('It should respond error when email is duplicate', async () => {
    await request(app)
      .post('/users')
      .send(userMock);
    const response = await request(app)
      .post('/users')
      .send(userMock);
    expect(response.body.internal_code).toBe(DUPLICATED_VALUE_ERROR);
    expect(response.statusCode).toBe(409);
  });

  test('It should respond error when password is invalid', async () => {
    const userInvalid = { ...userMock, password: 'invalid' };
    const response = await request(app)
      .post('/users')
      .send(userInvalid);
    expect(response.body.internal_code).toBe(SCHEMA_ERROR);
    expect(response.statusCode).toBe(422);
  });

  test('It should respond error when email is not present', async () => {
    const userInvalid = { ...userMock, email: undefined };
    const response = await request(app)
      .post('/users')
      .send(userInvalid);
    expect(response.body.internal_code).toBe(SCHEMA_ERROR);
    expect(response.statusCode).toBe(422);
  });

  test('It should respond error when domain email is invalid', async () => {
    const userInvalid = { ...userMock, email: 'invalid@invalid.in' };
    const response = await request(app)
      .post('/users')
      .send(userInvalid);
    expect(response.body.internal_code).toBe(SCHEMA_ERROR);
    expect(response.statusCode).toBe(422);
  });
});
