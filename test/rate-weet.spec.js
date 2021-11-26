const request = require('supertest');
const app = require('../app');
const { USER_POSITIONS } = require('../app/constants/params');
const { AUTHENTICATION_ERROR, SCHEMA_ERROR } = require('../app/errors');
const { findUserBy } = require('../app/services/user');
const { createUser } = require('./factory/user');
const { createWeet } = require('./factory/weet');
const { createUserSession } = require('./utils/user');

describe('POST /weets/:id/ratings', () => {

  test('It should respond an error when body isnt 1 or -1', async () => {
    const { body: { token } } = await createUserSession();
    const resp = await request(app)
      .post('/weets/1/ratings')
      .set('Authorization', token)
      .send({ score: 2 });

    expect(resp.body.internal_code).toBe(SCHEMA_ERROR);
    expect(resp.statusCode).toBe(422);
  });

  test('It should responde an error when token is invalid', async () => {
    await createUserSession();
    const resp = await request(app)
      .post('/weets/1/ratings')
      .set('Authorization', 'fakeToken');
    expect(resp.body.internal_code).toBe(AUTHENTICATION_ERROR);
    expect(resp.statusCode).toBe(401);
  });

  test('It should create a rating and respond 201', async () => {
    const { id: userId } = await createUser();
    const { id: weetId } = await createWeet({ userId });
    const { body: { token } } = await createUserSession();
    const resp = await request(app)
      .post('/weets/' + weetId + '/ratings')
      .set('Authorization', token)
      .send({ score: 1 });
    expect(resp.body).toBeDefined();
    expect(resp.statusCode).toBe(201);
  });

  test('It should increase user score when others rate the weet', async () => {
    const { id: userId } = await createUser();
    const { id: weetId } = await createWeet({ userId });
    const { body: { token } } = await createUserSession();
    await request(app)
      .post('/weets/' + weetId + '/ratings')
      .set('Authorization', token)
      .send({ score: 1 });

    const { body: { token: token2 } } = await createUserSession();
    const resp = await request(app)
      .post('/weets/' + weetId + '/ratings')
      .set('Authorization', token2)
      .send({ score: 1 });

    const user = await findUserBy({ id: userId })

    expect(user.score).toBe(2);
    expect(user.position).toBe(USER_POSITIONS.DEVELOPER);
    expect(resp.statusCode).toBe(201);
  });

  test('It should increase user score and update position', async () => {
    const { id: userId } = await createUser({ score: 4 });
    const { id: weetId } = await createWeet({ userId });
    const { body: { token } } = await createUserSession();

    const resp = await request(app)
      .post('/weets/' + weetId + '/ratings')
      .set('Authorization', token)
      .send({ score: 1 });

    const user = await findUserBy({ id: userId });

    expect(user.score).toBe(5);
    expect(user.position).toBe(USER_POSITIONS.LEAD);
    expect(resp.statusCode).toBe(201);
  });

  test('if the rating is the same, it should be restored', async () => {
    const { id: userId } = await createUser({ score: 4 });
    const { id: weetId } = await createWeet({ userId });
    const { body: { token } } = await createUserSession();

    const resp = await request(app)
      .post('/weets/' + weetId + '/ratings')
      .set('Authorization', token)
      .send({ score: -1 });
    const resp2 = await request(app)
      .post('/weets/' + weetId + '/ratings')
      .set('Authorization', token)
      .send({ score: -1 });
    const user = await findUserBy({ id: userId })

    expect(user.score).toBe(4);
    expect(user.position).toBe(USER_POSITIONS.DEVELOPER);
    expect(resp.statusCode).toBe(201);
    expect(resp2.statusCode).toBe(200);
  });
  
  test('if the rating is different, it should set new score', async () => {
    const { id: userId } = await createUser({ score: 4 });
    const { id: weetId } = await createWeet({ userId });
    const { body: { token } } = await createUserSession();

    await request(app)
      .post('/weets/' + weetId + '/ratings')
      .set('Authorization', token)
      .send({ score: -1 });

    const resp = await request(app)
      .post('/weets/' + weetId + '/ratings')
      .set('Authorization', token)
      .send({ score: 1 });
    const user = await findUserBy({ id: userId });

    expect(user.score).toBe(5);
    expect(user.position).toBe(USER_POSITIONS.LEAD);
    expect(resp.statusCode).toBe(200);
  });
});
