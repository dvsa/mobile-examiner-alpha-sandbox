/**
 * Domain model repository for TARS Journal data entities.
 */
import { query } from './database';
import { getLogger } from './util';
const logger = getLogger('repository', 'silly'); 

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
     * @param activeDate    The date to consider
     */
    getActiveExaminers(activeDate: Date): Promise<Object[]> {
        return query(this.username, this.password, this.connectionString, 
`select e.individual_id, e.staff_number, active_posting.tc_id, e.grade_code
 from examiner e, individual i,
     (select p.individual_id as posting_indv_id, p.tc_id as tc_id
      from posting p
      where :active_date between trunc(p.start_date) and trunc(p.end_date)
    ) active_posting
where e.individual_id = i.individual_id
and e.individual_id = active_posting.posting_indv_id(+)
and nvl(e.grade_code, 'ZZZ') != 'DELE'
and exists (
      select end_date from examiner_status es
      where es.individual_id = e.individual_id
      and nvl(es.end_date, to_date('01/01/4000', 'DD/MM/YYYY')) > :active_date
  )`,
            { active_date: activeDate });
    }
}