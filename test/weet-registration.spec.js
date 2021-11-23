const request = require('supertest');
const app = require('../app');
const { AUTHENTICATION_ERROR } = require('../app/errors');
const { createUserSession } = require('./utils/user');
const axios = require('axios');
const { WEET_API_ERROR } = require('../app/constants/errors');
const { validResponseMock } = require('./mocks/weet');
jest.mock('axios');

describe('POST /weets', () => {
  test('It should create a weet and respond with status 201', async () => {
    axios.get.mockImplementation(() => Promise.resolve(validResponseMock));
    const { body: { token } } = await createUserSession();
    const resp = await request(app)
      .post('/weets')
      .set('Authorization', token);
    expect(resp.body).toBeDefined();
    expect(resp.statusCode).toBe(201);
  });

  test('It should return an error witn status 503', async () => {
    axios.get.mockImplementation(() => Promise.reject());
    const { body: { token } } = await createUserSession();
    const resp = await request(app)
      .post('/weets')
      .set('Authorization', token);
    expect(resp.body.message).toBe(WEET_API_ERROR);
    expect(resp.statusCode).toBe(503);
  });

  test('It should responde an error when token is invalid', async () => {
    await createUserSession();
    const resp = await request(app)
      .post('/weets')
      .set('Authorization', 'fakeToken');
    expect(resp.body.internal_code).toBe(AUTHENTICATION_ERROR);
    expect(resp.statusCode).toBe(401);
  });
});
