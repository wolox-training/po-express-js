const axios = require('axios');
const { url } = require('../../config').common.weetService;
const { defaultError } = require('../errors');

exports.getWeet = async () => {
  try {
    const { data } = await axios.get(`${url}?format=json`);
    return data;
  } catch (error) {
    return defaultError(error);
  }
};
