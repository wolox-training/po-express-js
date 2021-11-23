const request = require('supertest');
const app = require('../../app');

exports.getAllWeets = (token = '', limit = 10, page = 1) =>
  request(app)
    .get(`/weets?limit=${limit}&page=${page}`)
    .set('Authorization', token);
