const CronJob = require('cron').CronJob;
const { countWeets } = require('../services/weet');
const { sendMail } = require('./mailer');
const { MAILER_BEST_WEETER } = require('../constants/params');
const logger = require('../logger');

module.exports.bestWeetersJob = cronTime => new CronJob(cronTime, () => {
  const TODAY = new Date().setHours(0, 0, 0, 0);
  countWeets(TODAY)
    .then(user => {
      if (user) return sendMail({ ...MAILER_BEST_WEETER, to: user['user.email'] })
      logger.info('No one weeted.');
    })
    .catch(error => {
      logger.info(error)
    })
});
