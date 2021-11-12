const { TOKEN_ERROR } = require('../constants/errors');
const { authenticationError } = require('../errors');
const { verifyToken } = require('../helpers/jwt');
const logger = require('../logger');

module.exports.validateSession = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next(authenticationError(TOKEN_ERROR));
  }
  try {
    const user = verifyToken(token);
    res.locals.user = user;
    logger.info(`${user.email} validated token`);
    next();
  } catch (error) {
    next(authenticationError(error.message));
  }
};
