const jwt = require('jsonwebtoken');
const { secret } = require('../../config').common.session;

module.exports.getToken = payload => jwt.sign(payload, secret);
module.exports.verifyToken = token => jwt.verify(token, secret);
