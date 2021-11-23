const axios = require('axios');
const { url } = require('../../config').common.weetService;
const { databaseError, serviceUnavailable } = require('../errors');
const { Weet } = require('../models');
const logger = require('../logger');
const { WEET_API_ERROR } = require('../constants/errors');
const { PASSWORD_PARAM, USERID_PARAM } = require('../constants/params');
const { User } = require('../models');

exports.getWeetContent = async () => {
  try {
    const { data: { joke } } = await axios.get(`${url}?format=json`);
    return joke;
  } catch (error) {
    logger.error(error);
    throw serviceUnavailable(WEET_API_ERROR);
  }
};

exports.createWeet = async weet => {
  try {
    const weetInfo = await Weet.create(weet);
    return weetInfo;
  } catch (error) {
    logger.error(error);
    throw databaseError(error);
  }
};

exports.getAllWeets = async params => {
  try {
    const { rows: weets, count } = await Weet
      .findAndCountAll({
        ...params,
        attributes: { exclude: [USERID_PARAM] },
        include: [
          {
            model: User,
            as: 'user',
            attributes: { exclude: [PASSWORD_PARAM] }
          }
        ]
      });
    return { weets, count };
  } catch (error) {
    logger.error(error);
    throw databaseError(error);
  }
};
