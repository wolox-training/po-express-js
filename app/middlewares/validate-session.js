const { TOKEN_ERROR, SESSION_ERROR } = require('../constants/errors');
const { authenticationError } = require('../errors');
const { verifyToken } = require('../helpers/jwt');
const logger = require('../logger');
const { findUserBy } = require('../services/user');

module.exports.validateSession = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next(authenticationError(TOKEN_ERROR));
  }
  try {
    const user = verifyToken(token);
    const { sessionExpires } = await findUserBy({ id: user.id });
    if (sessionExpires > user.createdAt)
      return next(authenticationError(SESSION_ERROR));
    res.locals.user = user;
    logger.info(`${user.email} validated token`);
    next();
  } catch (error) {
    next(authenticationError(error.message));
  }
};
