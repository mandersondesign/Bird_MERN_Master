import {EntityRepository, Repository} from 'typeorm';
import Order from '../../models/squarespace/order';

@EntityRepository(Order)
export default class OrderRepository extends Repository<Order> {

	public add({ email, orderNumber, firstName, lastName, productName, createdOn, planTemplateId }): Promise<Order> {
		return this.save({
			email,
			orderNumber,
			firstName,
			lastName,
			productName,
			createdOn,
			planTemplateId,
		});
	}

	public findByOrderNumber(orderNumber: number): Promise<Order> {
		return this.findOne({
			where: { orderNumber },
		});
	}

}
