const { encrypt } = require('../helpers/encrypt');
const logger = require('../logger');
const { createUser } = require('../services/user');

exports.userRegistration = async (req, res, next) => {
  try {
    const { password:currentPass, ...body } = req.body;
    const password = await encrypt(currentPass);
    const user = await createUser({ password, ...body });
    logger.info(`User ${user.name} created`);
    res.status(201).send( user );
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
