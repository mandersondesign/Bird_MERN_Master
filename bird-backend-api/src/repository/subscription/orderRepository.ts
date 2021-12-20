import {EntityRepository, In, Repository} from 'typeorm';
import Order from '../../models/subscription/order';

@EntityRepository(Order)
export default class OrderRepository extends Repository<Order> {

	public add( { userId, programId, date, amount, appleTransactionId, appleTransactionPayload }) {
		return this.save({
			userId,
			programId,
			amount,
			date,
			appleTransactionId,
			appleTransactionPayload
		});
	}

	public findByUserIds(ids: number[]): Promise<Order[]> {
		return this.find({
			where: { userId: In(ids) },
		});
	}

	public findByProgramId(userId: number, programId: number): Promise<Order[]> {
		return this.find({
			where: { userId, programId },
		});
	}
}
