const { emailError, databaseError } = require('../errors');
const { User } = require('../models');
const logger = require('../logger');
const { DUPLICATED_ERROR } = require('../constants/errors');

exports.createUser = async user => {
  try {
    const {
      dataValues: { password, ...userInfo }
    } = await User.create(user);
    return userInfo;
  } catch (error) {
    logger.error(error.message);
    const { parent } = error;
    if (parent && parent.routine === DUPLICATED_ERROR) {
      throw emailError(error.message);
    }
    throw databaseError(error);
  }
};

exports.findUserBy = async params => {
  try {
    const userInfo = await User.findOne({ where: params });
    return userInfo;
  } catch (error) {
    logger.error(error.message);
    throw databaseError(error);
  }
};
