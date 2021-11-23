const { getWeetContent, createWeet } = require("../services/weet");
const logger = require('../logger');

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
