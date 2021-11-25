const { Rating, sequelize } = require('../models');
const logger = require('../logger');
const { databaseError } = require('../errors');
const { calculateUserScore } = require('../helpers/calculate-user-score');

exports.createRating = async (rating, user) => {

  const transaction = await sequelize.transaction();
  try {
    const { score } = rating;
    const { score: userScore } = user;
    const ratingInfo = await Rating.create(rating, { transaction });

    await user.update({ score: (userScore + score) }, { transaction });
    await transaction.commit();
    return ratingInfo;
  } catch (error) {
    logger.error(error);
    if (transaction.rollback) await transaction.rollback();
    throw databaseError(error);
  }
};

exports.updateRating = async (score, rating, user) => {

  const transaction = await sequelize.transaction();
  try {

    const { score: currentScore } = rating;
    const { score: currentUserScore } = user;
    const newRatingScore = currentScore === score ? 0 : score;
    const newUserScore = calculateUserScore(score,currentScore);

    const ratingInfo = await rating.update({ score: newRatingScore }, { transaction });
    await user.update({ score: (newUserScore + currentUserScore) }, { transaction });
    await transaction.commit();
    return ratingInfo;
  } catch (error) {
    logger.error(error);
    if (transaction.rollback) await transaction.rollback();
    throw databaseError(error);
  }
};

exports.findRatingBy = async params => {
  try {
    const ratingInfo = await Rating.findOne({ where: params });
    return ratingInfo;
  } catch (error) {
    logger.error(error.message);
    throw databaseError(error);
  }
};
