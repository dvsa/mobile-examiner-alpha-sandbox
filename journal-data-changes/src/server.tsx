/**
 * Node.js Typescript CLI app, to generate changes in journal data in a TARS database.
 * To be used to test data replication in change data capture (CDC mode), or to generate
 * load for performance testing.
 */


let oracledb = require('oracledb');
let winston = require('winston');
let logger = new winston.Logger({
    transports: [
      new winston.transports.Console({
        colorize: true,
        timestamp: true
      })
    ]
  });
// let sleep = require('sleep');

function query(username: string, dbPassword: string, connectionString: string, sqlQuery: string): Promise<Object[]> {
  return new Promise((resolve, reject) => {
    let conn;

    logger.debug('calling getConnection...');
    oracledb.getConnection(
      {
        user: username,
        password: dbPassword,
        connectString: connectionString
      })
      .then((connection) => {
        logger.debug('got connection');
        conn = connection;

        // return each row as an object rather than an array
        return conn.execute(sqlQuery, [], { outFormat: oracledb.OBJECT });
      })
      .then((result) => {
        logger.debug('query returned successfully');
        // direct fetch of all rows as objects
        resolve(result.rows);
      }, (err) => {
        logger.error('query failed: %s', err.message);
        reject(err);
      })
      .then(() => {
        if (conn) {
          logger.debug('closing connection');
          return conn.close();
        }
      })
      .catch((err) => {
        logger.error('error closing connection: %s', err.message);
      });
  });
}

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

logger.level = 'debug';

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
