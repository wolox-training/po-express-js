const request = require('supertest');
const app = require('../app');
const { credentialsMock, userMock } = require('./mocks/user');
const { AUTHENTICATION_ERROR } = require('../app/errors');
const { createUserSession } = require('./utils/user');

describe('POST /admin/users', () => {

  test('It should respond an error  when user isnt an admin', async () => {
    const { body: { token } } = await createUserSession({ email: credentialsMock.email });
    const resp = await request(app)
      .post('/admin/users')
      .set('Authorization', token)
      .send(userMock);
    expect(resp.body.internal_code).toBe(AUTHENTICATION_ERROR);
    expect(resp.statusCode).toBe(401);
  });

  test('It should update the role  when user is registered ', async () => {
    const { body: { token } } = await createUserSession({ email: credentialsMock.email, role: 'ADMIN' });
    const resp = await request(app)
      .post('/admin/users')
      .set('Authorization', token)
      .send(userMock);
    expect(resp.body).toBeDefined();
    expect(resp.statusCode).toBe(200);
  });

  test('It should create the user and respond 201 ', async () => {
    const { body: { token } } = await createUserSession({ email: credentialsMock.email, role: 'ADMIN' });
    const resp = await request(app)
      .post('/admin/users')
      .set('Authorization', token)
      .send({ ...userMock, email: 'newEmail2@wolox.co' });
    expect(resp.body).toBeDefined();
    expect(resp.statusCode).toBe(201);
  });
});
