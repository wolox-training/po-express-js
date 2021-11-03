const bcrypt = require('bcryptjs');
const saltRounds = 10;

module.exports.encrypt = (value) =>
  bcrypt
  .hash(value, saltRounds)
  .then(value)
  .catch(error => { throw Error(error) })
