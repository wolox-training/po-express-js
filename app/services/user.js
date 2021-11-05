const { emailError, databaseError } = require('../errors');
const { User } = require('../models');
const logger = require('../logger');
const errorDuplicate = '_bt_check_unique';
exports.createUser = async user => {
  try {
    const {
      dataValues: { password, ...userInfo }
    } = await User.create(user);
    return userInfo;
  } catch (error) {
    logger.error(error.message);
    const { parent } = error;
    if (parent && parent.routine === errorDuplicate) {
      throw emailError(error.message);
    }
    throw databaseError(error);
  }
};
