const { UNAUTHORIZED } = require('../constants/errors');
const { ROLES } = require('../constants/params');
const { authenticationError } = require('../errors');

module.exports.validateAdmin = (req, res, next) => {
  const { role } = res.locals.user;
  if (role !== ROLES.ADMIN) next(authenticationError(UNAUTHORIZED));
  next();
};
