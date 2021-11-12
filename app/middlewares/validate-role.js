const { UNAUTHORIZED } = require('../constants/errors');
const { authenticationError } = require('../errors');

module.exports.validateInRole = (userRol) => (req, res, next) => {
  const { role } = res.locals.user;
  if (role !== userRol) return next(authenticationError(UNAUTHORIZED));
  return next();
};
