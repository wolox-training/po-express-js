const request = require('supertest');
const app = require('../app');
const { AUTHENTICATION_ERROR } = require('../app/errors');
const { factoryUser } = require('./factory/user');
const { credentialsMock } = require('./mocks/user');

describe('POST /users/sessions', () => {
  test('It should return a token when user is registered', async () => {
    await factoryUser({ email: credentialsMock.email });
  
    const response = await request(app)
      .post('/users/sessions')
      .send(credentialsMock);
    expect(response.body.token).toBeDefined();
    expect(response.statusCode).toBe(200);
  });

  test('It should return a error when user is not registered', async () => {
    const response = await request(app)
      .post('/users/sessions')
      .send(credentialsMock);

    expect(response.body.internal_code).toBe(AUTHENTICATION_ERROR);
    expect(response.statusCode).toBe(401);
  });

  test('It should return a error when user is registered but with invalid pass', async () => {
    await factoryUser({ email: credentialsMock.email });

    const invalidCredencials = { ...credentialsMock, password: 'invalid12345' }
    const response = await request(app)
      .post('/users/sessions')
      .send(invalidCredencials);

    expect(response.body.internal_code).toBe(AUTHENTICATION_ERROR);
    expect(response.statusCode).toBe(401);
  });
});
