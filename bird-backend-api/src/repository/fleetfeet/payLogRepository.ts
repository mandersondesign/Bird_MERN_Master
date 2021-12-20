import {EntityRepository, In, Repository} from 'typeorm';
import PayLog from '../../models/fleetfeet/pay_log';

@EntityRepository(PayLog)
export default class PayLogRepository extends Repository<PayLog> {

	public add( { userId, fletfeetEventId, date, amount }) {
		return this.save({
			userId,
			fletfeetEventId,
			amount,
			date,
		});
	}

	public findByUserIds(ids: number[]): Promise<PayLog[]> {
		return this.find({
			where: { userId: In(ids) },
		});
	}
}
