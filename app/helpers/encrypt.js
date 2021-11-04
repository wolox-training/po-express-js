const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10;
module.exports.encrypt = value =>
  bcrypt
    .hash(value, SALT_ROUNDS)
    .then(value);
