
const { healthCheck } = require('./controllers/healthCheck');
const { userRegistration } = require('./controllers/user');
const { validateSchema } = require('./middlewares/validateSchema');
const { userSchema } = require('./helpers/schemas/userSchema');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', [validateSchema(userSchema)],userRegistration);
};
