/**
 * Domain model repository for TARS Journal data entities.
 */
import { query, generateInClause } from './database';
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

    /**
     * Get any test bookings in examiner programmes, on a set day.
     * @param activeDate    The date to consider
     * @param individualIds Identifies the examiners
     */
    getBookings(activeDate: Date, individualIds: number[]): Promise<Object[]> {
        return query(this.username, this.password, this.connectionString, 
`select ps.slot_id, a.app_id, i.individual_id, i.driver_number, i.first_forename, i.family_name
from programme p, programme_slot ps, booking b, application a, individual i
where trunc(p.programme_date) = :active_date
and p.individual_id in (` +
            generateInClause(individualIds) +
`) and (p.state_code not in (2, 3)
    or exists (SELECT book.booking_id
            FROM booking book, programme_slot slot
            WHERE slot.slot_id = book.slot_id
            AND TRUNC(slot.programme_date) = TRUNC(p.programme_date)
            AND slot.individual_id = p.individual_id
            AND slot.tc_id = p.tc_id
            AND book.state_code = 1)
    )
and trunc(ps.programme_date) = trunc(p.programme_date)
and ps.individual_id = p.individual_id
and ps.tc_id = p.tc_id
and ps.tc_closed_ind != 1
and nvl(ps.deployed_to_from_code, 0) != 1
and b.slot_id = ps.slot_id
and b.state_code != 2
and a.app_id = b.app_id
and i.individual_id = a.individual_id`,
            ([ activeDate ] as any[]).concat(individualIds));
    }

    /**
     * Get an array of the individual ids of the first count results. 
     * @param results       The examiner results
     * @param count         The number of the subset
     * @returns The subset, which could be from zero to count long
     */
    getExaminerSubset(results: Object[], count: number): number[] {
        let subset = [];

        if (results != null) {
            results.slice(0, Math.min(count, results.length)).forEach((result) => {
                if ('INDIVIDUAL_ID' in result) {
                    subset = subset.concat(result['INDIVIDUAL_ID']);
                }
            });
        }

        return subset;
    }
}