const { notFoundError, authenticationError } = require('../errors');
const { encrypt, comparePass } = require('../helpers/encrypt');
const { createUser, findUserBy } = require('../services/user');
const logger = require('../logger');
const { getToken } = require('../helpers/jwt');
const { USER_NOT_FOUND, CREDENTIALS_ERROR } = require('../constants/errors');

exports.signUp = async (req, res, next) => {
  try {
    const body = req.body;
    const hashedPassword = await encrypt(body.password);
    const user = await createUser({ ...body, password: hashedPassword });
    logger.info(`User ${user.name} created`);
    res.status(201).send(user);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const dbUser = await findUserBy(email);
    if (!dbUser) throw notFoundError(USER_NOT_FOUND);

    const result = await comparePass(password, dbUser.password);
    if (!result) throw authenticationError(CREDENTIALS_ERROR);

    const token = getToken({ email });
    logger.info(`${dbUser.email} authenticated`);
    res.status(200).send({ token });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
