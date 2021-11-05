const { healthCheck } = require('./controllers/healthCheck');
const { signUp, signIn } = require('./controllers/user');
const { validateSchema } = require('./middlewares/validateSchema');
const { userSchema, credentialsSchema } = require('./helpers/schemas/userSchema');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', [validateSchema(userSchema)], signUp);
  app.post('/users/sessions', [validateSchema(credentialsSchema)], signIn);
};
