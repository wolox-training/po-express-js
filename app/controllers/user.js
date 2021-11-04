const { encrypt } = require('../helpers/encrypt');
const logger = require('../logger');
const { createUser } = require('../services/user');

exports.userRegistration = async (req, res, next) => {
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
