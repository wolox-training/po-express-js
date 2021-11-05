const request = require('supertest');
const { DATABASE_ERROR, SCHEMA_ERROR } = require('../app/errors');
const app = require('../app');

const userMock = {
  name: 'Pedro',
  lastName: 'Ortiz',
  email: 'pedro@wolox.com',
  password: 'Pass12341234'
};

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
    expect(response.body.internal_code).toBe(DATABASE_ERROR);
    expect(response.statusCode).toBe(503);
  });

  test('It should respond error when password is invalid', async () => {
    const userInvalid = { ...userMock, password: 'invalid' };
    const response = await request(app)
      .post('/users')
      .send(userInvalid);
    expect(response.body.internal_code).toBe(SCHEMA_ERROR);
    expect(response.statusCode).toBe(409);
  });

  test('It should respond error when email is not present', async () => {
    const userInvalid = { ...userMock, email: undefined };
    const response = await request(app)
      .post('/users')
      .send(userInvalid);
    expect(response.body.internal_code).toBe(SCHEMA_ERROR);
    expect(response.statusCode).toBe(409);
  });

  test('It should respond error when domain email is invalid', async () => {
    const userInvalid = { ...userMock, email: 'invalid@invalid.in', };
    const response = await request(app)
      .post('/users')
      .send(userInvalid);
    expect(response.body.internal_code).toBe(SCHEMA_ERROR);
    expect(response.statusCode).toBe(409);
  });
});
