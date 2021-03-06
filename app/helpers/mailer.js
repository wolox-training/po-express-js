const nodemailer = require('nodemailer');
const logger = require('../logger');
const { email: user, pass, service } = require('../../config').common.mailer;

module.exports.sendMail = options => {
  try {
    const transporter = nodemailer.createTransport({ service, auth: { user, pass } });
    transporter.sendMail({ from: user, ...options })
      .then(info => logger.info('Email sent ' + info.response))
      .catch(error => logger.error(error));
  } catch (error) {
    logger.error(error);
  }
}
