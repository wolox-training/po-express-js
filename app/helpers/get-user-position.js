const { USER_POSITIONS } = require('../constants/params');

module.exports.getPositionByScore = score => {
  if (score < 5 ) return USER_POSITIONS[0];
  if (score < 10) return USER_POSITIONS[1];
  if (score < 20) return USER_POSITIONS[2];
  if (score < 30) return USER_POSITIONS[3];
  if (score < 50) return USER_POSITIONS[4];
  if (score >= 50) return USER_POSITIONS[5];
}
