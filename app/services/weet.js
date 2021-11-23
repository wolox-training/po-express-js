const axios = require('axios');
const { url } = require('../../config').common.weetService;
const { databaseError, serviceUnavailable } = require('../errors');
const { Weet } = require('../models');
const logger = require('../logger');
const { WEET_API_ERROR } = require('../constants/errors');

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
