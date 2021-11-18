const { TOKEN_ERROR } = require('../app/constants/errors');
const { SCHEMA_ERROR } = require('../app/errors');
const { createUser } = require('./factory/user');
const { createManyWeet, createWeet } = require('./factory/weet');
const { createUserSession } = require('./utils/user');
const { getAllWeets } = require('./utils/weet');

describe('GET /weets', () => {
  let authToken = null;

  beforeEach(async () => {
    const { body: { token } } = await createUserSession();
    authToken = token;
  });

  test('It should return an error when user is not authenticated', async () => {
    const response = await getAllWeets();
    expect(response.body.message).toBe(TOKEN_ERROR);
    expect(response.statusCode).toBe(401);
  });

  test('It should return an error when query is invalid', async () => {
    const response = await getAllWeets(authToken, 10, -1);
    expect(response.body).toHaveProperty('message');
    expect(response.body.internal_code).toBe(SCHEMA_ERROR);
    expect(response.statusCode).toBe(422);
  });

  test('It should return 10 weets and total 20', async () => {
    const { dataValues: { id } } = await createUser();
    await createManyWeet(20, { userId: id });
    const { body } = await getAllWeets(authToken, 10);
    expect(body.weets.length).toBe(10);
    expect(body.count).toBe(20);
  });

  test('It should return 4 weets when count is 8, limit=4 and page=2', async () => {
    const { dataValues: { id } } = await createUser();
    await createManyWeet(8, { userId: id });
    const { body } = await getAllWeets(authToken, 4, 2);
    expect(body.weets.length).toBe(4);
    expect(body.count).toBe(8);
  });

  test('It should return a user associated with the weet', async () => {
    const { dataValues: { id, email } } = await createUser();
    await createWeet({ userId: id });
    const { body } = await getAllWeets(authToken);
    expect(body.weets[0].user.email).toBe(email);
    expect(body.weets[0].user.id).toBe(id);
  });

});
