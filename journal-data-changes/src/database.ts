/**
 * Database integration using the oracledb module.
 */
import * as oracledb from 'oracledb';
import { getLogger} from './util';
const logger = getLogger('database', 'debug');

/**
 * Opens a connection and runs a single SQL query.
 * @param username          The database username
 * @param dbPassword        The database password
 * @param connectionString  The database connection string
 * @param sqlQuery          The SQL query to run
 * @returns The results as an array of objects (each property is the column name in upper case)
 */
export function query(username: string, dbPassword: string, connectionString: string, sqlQuery: string): Promise<Object[]> {
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