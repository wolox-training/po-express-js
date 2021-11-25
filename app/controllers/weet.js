const { getWeetContent, createWeet, getAllWeets, findWeetBy } = require('../services/weet');
const logger = require('../logger');
const { createRating, findRatingBy, updateRating } = require('../services/rating');
const { notFoundError } = require('../errors');
const { WEET_NOT_FOUND } = require('../constants/errors');

exports.createWeet = async (req, res, next) => {
  try {
    const content = await getWeetContent();
    const { id: userId } = res.locals.user;
    const resp = await createWeet({ userId, content });
    logger.info(`Weet ${resp.id} created`);
    res.status(201).send(resp);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.getWeets = async (req, res, next) => {
  try {
    const { limit, page } = req.query;
    const offset = (page - 1) * limit;
    const weets = await getAllWeets({ limit, offset });
    res.status(200).send(weets);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.rateWeet = async (req, res, next) => {
  try {
    const { id: userId } = res.locals.user;
    const { id: weetId } = req.params;
    const { score } = req.body;

    const weetFound = await findWeetBy({ id: weetId });
    if (!weetFound) throw notFoundError(WEET_NOT_FOUND);

    const { user } = weetFound; 
    const ratingFound = await findRatingBy({ weetId, userId });
    if (!ratingFound) {
      const ratingCreated = await createRating({ userId, weetId, score }, user);
      return res.status(201).send(ratingCreated);
    }
    const ratingResponse = await updateRating( score , ratingFound, user);
    return res.status(200).send(ratingResponse);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
