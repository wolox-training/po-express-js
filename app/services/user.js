const { databaseError } = require('../errors');
const { User } = require('../models');
const logger = require('../logger');

exports.createUser = async user => {
  try {
    const { dataValues: { password, ...userInfo } } = await User.create(user);
    return userInfo;
  } catch ({ message }) {
    logger.error(message);
    throw databaseError(message);
  }
};
