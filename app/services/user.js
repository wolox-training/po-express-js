const { schemaError } = require('../errors');
const { User } = require('../models');
const logger = require('../logger');

exports.createUser = async user => {
  try {
    const {
      dataValues: { password, ...userInfo }
    } = await User.create(user);
    return userInfo;
  } catch (error) {
    logger.error(error.message);
    throw schemaError(error.message);
  }
};
