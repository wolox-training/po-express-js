const { authenticationError } = require('../errors');
const { encrypt, compareHash } = require('../helpers/encrypt');
const { createUser, findUserBy, getAllUsers, updateUserBy } = require('../services/user');
const logger = require('../logger');
const { createToken } = require('../helpers/jwt');
const { CREDENTIALS_ERROR, TOKEN_ERROR } = require('../constants/errors');
const { ROLES, MAILER_WELCOME } = require('../constants/params');
const { sendMail } = require('../helpers/mailer');

exports.signUp = async (req, res, next) => {
  try {
    const { body } = req;
    const hashedPassword = await encrypt(body.password);
    const user = await createUser({ ...body, password: hashedPassword });
    logger.info(`User ${user.name} created`);
    res.status(201).send(user);
    sendMail({ ...MAILER_WELCOME, to: user.email });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.signUpAdmin = async (req, res, next) => {
  try {
    const { body } = req;
    const { email } = body;
    const dbUser = await findUserBy({ email });
    if (dbUser) {
      const response = await updateUserBy({ role: ROLES.ADMIN }, { email });
      return res.status(200).send(response);
    }
    const hashedPassword = await encrypt(body.password);
    const userInfo = { ...body, password: hashedPassword, role: ROLES.ADMIN };
    const user = await createUser(userInfo);
    logger.info(`User ${user.name} created`);
    res.status(201).send(user);
    sendMail({ ...MAILER_WELCOME, to: user.email });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const dbUser = await findUserBy({ email });
    if (!dbUser) throw authenticationError(CREDENTIALS_ERROR);

    const result = await compareHash(password, dbUser.password);
    if (!result) throw authenticationError(CREDENTIALS_ERROR);
    const { id, role } = dbUser;
    const createdAt = Date.now();
    const token = createToken({ email, role, id, createdAt });
    logger.info(`${dbUser.email} authenticated`);
    res.status(200).send({ token });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const { id } = res.locals.user;
    const dbUser = await findUserBy(id);
    if (!dbUser) throw authenticationError(TOKEN_ERROR);
    const sessionExpires = Date.now();
    const response = updateUserBy({ sessionExpires }, { id });
    logger.info(`${dbUser.email} logout`);
    return res.status(200).send(response);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const { limit, page } = req.query;
    const offset = (page - 1) * limit;
    const users = await getAllUsers({ limit, offset });
    res.status(200).send(users);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
