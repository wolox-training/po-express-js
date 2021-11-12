const { TOKEN_ERROR } = require('../app/constants/errors');
const { SCHEMA_ERROR } = require('../app/errors');
const { createManyUser } = require('./factory/user');
const { getAllUsers, createUserSession } = require('./utils/user');
const { credentialsMock } = require('./mocks/user');

describe('GET /users', () => {
  let authToken = null;
  beforeEach(async () => {
    const { email } = credentialsMock;
    const { body: { token } } = await createUserSession({ email });
    authToken = token;
  });

  test('It should return an error when user is not authenticated', async () => {
    const response = await getAllUsers();
    expect(response.body.message).toBe(TOKEN_ERROR);
    expect(response.statusCode).toBe(401);
  });

  test('It should return an error when query is invalid', async () => {
    const response = await getAllUsers(authToken, 10, -1);
    expect(response.body).toHaveProperty('message');
    expect(response.body.internal_code).toBe(SCHEMA_ERROR);
    expect(response.statusCode).toBe(422);
  });

  test('It should return 10 users and total 26', async () => {
    await createManyUser(25);
    const { body } = await getAllUsers(authToken, 8);
    expect(body.users.length).toBe(8);
    expect(body.count).toBe(26);
  });

  test('It should return two users when limit = 4 and page = 2', async () => {
    await createManyUser(4);
    const { body } = await getAllUsers(authToken, 4, 2);
    expect(body.users.length).toBe(1);
    expect(body.count).toBe(5);
  });
});
