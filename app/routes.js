const { healthCheck } = require('./controllers/healthCheck');
const { signUp, signIn, getUsers, signUpAdmin } = require('./controllers/user');
const { validateSchema } = require('./middlewares/validate-schema');
const { userSchema, credentialsSchema } = require('./helpers/schemas/user-schema');
const { paginationSchema } = require('./helpers/schemas/pagination-schema');
const { validateSession } = require('./middlewares/validate-session');
const { QUERY_PARAM, ROLES } = require('./constants/params');
const { validateInRole } = require('./middlewares/validate-role');
const { createWeet, getWeets } = require('./controllers/weet');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/users', [validateSession, validateSchema(paginationSchema, QUERY_PARAM)], getUsers);
  app.post('/admin/users', [validateSession, validateInRole(ROLES.ADMIN), validateSchema(userSchema)], signUpAdmin);
  app.post('/users', [validateSchema(userSchema)], signUp);
  app.post('/users/sessions', [validateSchema(credentialsSchema)], signIn);
  app.post('/weets', [validateSession], createWeet);
  app.get('/weets', [validateSession, validateSchema(paginationSchema, QUERY_PARAM)], getWeets);
};
