const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10;
module.exports.encrypt = value => bcrypt.hash(value, SALT_ROUNDS);
module.exports.comparePass = (password,hash) => bcrypt.compare(password, hash);
