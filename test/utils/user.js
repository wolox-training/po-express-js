const request = require('supertest');
const app = require('../../app');
const { createUser } = require('../factory/user');
const { credentialsMock } = require('../mocks/user');

exports.createUserSession = async user => {
  const { dataValues: { email } } = await createUser(user);
  const credentials = { password: credentialsMock.password, email }
  return request(app).post('/users/sessions').send(credentials);
};
exports.getAllUsers = (token = '', limit = 10, page = 1) => {
  return request(app)
    .get(`/users?limit=${limit}&page=${page}`)
    .set('Authorization', token);
};
