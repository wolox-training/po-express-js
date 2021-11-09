const { healthCheck } = require('./controllers/healthCheck');
const { signUp, signIn, getUsers } = require('./controllers/user');
const { validateSchema } = require('./middlewares/validateSchema');
const { userSchema, credentialsSchema } = require('./helpers/schemas/userSchema');
const { paginationSchema } = require('./helpers/schemas/paginationSchema');
const { validateSession } = require('./middlewares/validateSession');
const { QUERY_PARAM } = require('./constants/params');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/users', [validateSession, validateSchema(paginationSchema,QUERY_PARAM)], getUsers);
  app.post('/users', [validateSchema(userSchema)], signUp);
  app.post('/users/sessions', [validateSchema(credentialsSchema)], signIn);
};
