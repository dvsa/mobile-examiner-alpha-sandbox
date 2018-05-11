/**
 * Node.js Typescript CLI app, to generate changes in journal data in a TARS database.
 * To be used to test data replication in change data capture (CDC mode), or to generate
 * load for performance testing.
 */

import { query } from './database';
import { getLogger} from './util';
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
logger.info('Connecting to %s as %s', connectionString, username);

logger.info('Running query...');
query(username, password, connectionString, `SELECT staff_number, grade_code FROM examiner`)
  .then((result: Object[]) => {
    logger.debug('Got result: %d rows', result.length);
    result.forEach((row) => {
      logger.silly('staff_number: %s, grade_code: %s', row['STAFF_NUMBER'], row['GRADE_CODE']);
    });
  })
  .catch((err) => {
    logger.error('Got error: %s', err.message);
  })
logger.info('Query returned...');
