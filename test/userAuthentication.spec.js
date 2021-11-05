const request = require('supertest');
const app = require('../app');
const { NOT_FOUND_ERROR, AUTHENTICATION_ERROR } = require('../app/errors');
const { credentialsMock, userMock } = require('./mocks/user');

describe('POST /users/sessions', () => {
  test('It should return a token when user is registered', async () => {
  
    await request(app).post('/users').send(userMock);
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
    
    expect(response.body.internal_code).toBe(NOT_FOUND_ERROR);
    expect(response.statusCode).toBe(404);
    });

    test('It should return a when user is registered but with invalid pass', async () => {
      await request(app).post('/users').send(userMock);
      const invalidaCredencials = { ...credentialsMock, password: 'invalid12345' }
      const response = await request(app)
      .post('/users/sessions')
      .send(invalidaCredencials);
      
      expect(response.body.internal_code).toBe(AUTHENTICATION_ERROR);
      expect(response.statusCode).toBe(401);
    });  
});
