const app = require('./app');
const migrationsManager = require('./migrations');
const config = require('./config');
const logger = require('./app/logger');
const { bestWeetersJob } = require('./app/helpers/cron-job');

const port = config.common.api.port || 8080;

const midnight = '0 59 23 * * *';
const job = bestWeetersJob(midnight);

Promise.resolve()
  .then(() => migrationsManager.check())
  .then(() => {
    app.listen(port);
    job.start();
    logger.info(`bestWeetersJob started`);
    logger.info(`Listening on port: ${port}`);
  })
  .catch(logger.error);
