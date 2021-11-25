const { USER_POSITIONS } = require('../constants/params');

module.exports.getPositionByScore = score => {
  if (score < 5 ) return USER_POSITIONS.DEVELOPER;
  if (score < 10) return USER_POSITIONS.LEAD;
  if (score < 20) return USER_POSITIONS.TL;
  if (score < 30) return USER_POSITIONS.EM;
  if (score < 50) return USER_POSITIONS.HEAD;
  if (score >= 50) return USER_POSITIONS.CEO;
}
