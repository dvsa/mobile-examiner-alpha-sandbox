/**
 * Node.js Typescript CLI app, to generate changes in journal data in a TARS database.
 * To be used to test data replication in change data capture (CDC mode), or to generate
 * load for performance testing.
 */

import repository from './repository';
import { getLogger } from './util';
const logger = getLogger('server', 'debug');  
// let sleep = require('sleep');

/**
 * Loops forever (use Control-C to force exit)
 * @param {number} rate   The number of actions per minute
 */
/*function run(rate: number): never {
  const sleepIntervalMillis = 60000 / rate;
  while (true) {
    console.log("Running query...");
    getExaminer();
    console.log("Query returned...");
    sleep.msleep(sleepIntervalMillis);
    console.log('Still here');
  }
}

run(30);*/

// extract parameters
if (process.argv.length < 5) {
  logger.error('Error - database connection details must be passed as arguments');
  logger.error('Usage: npm start <username> <password> <connection string>');
  process.exit(1);
}
const [username, password, connectionString] = process.argv.slice(2, 5);
const repo = new repository(username, password, connectionString);

// assume today is... (month starts from zero!)
const activeDate = new Date(2017, 7, 14);
logger.info('Loading all active examiners on %s...', activeDate.toDateString());
repo.getActiveExaminers(activeDate)
  .then((examiners) => {
    logger.info("Found %d examiners", examiners.length)
  })
  .catch((err) => {
    logger.error("Error reading from TARS: %s", err.message);
  });
