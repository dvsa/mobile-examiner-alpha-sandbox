/**
 * Domain model repository for TARS Journal data entities.
 */
import { query } from './database';
import { getLogger } from './util';
const logger = getLogger('repository', 'debug'); 

export default class Repository {

    /**
     * Creates a new instance.
     * @param username          The database username 
     * @param password          The database password
     * @param connectionString  The database connection string
     */
    constructor(private readonly username: string, private readonly password: string, private readonly connectionString: string) {
        logger.info('Will connect to %s as %s', connectionString, username);
    }

    /**
     * Get all active posted examiners on a set day.
     */
    getExaminers() {
        logger.info('Running query...');
        query(this.username, this.password, this.connectionString, `SELECT staff_number, grade_code FROM examiner`)
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
    }
}