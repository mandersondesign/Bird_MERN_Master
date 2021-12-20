import {EntityRepository, Repository} from 'typeorm';
import Event from '../../models/event/event';

@EntityRepository(Event)
export default class EventRepository extends Repository<Event> {

	public findAllForFreeAthlete(): Promise<Event[]> {
		return this.find({
			where: {
				isActive: true,
				isOnlyForPaid: false,
			},
			order: {
				positionInList: 'ASC'
			},
		});
	}

	public findAllForPaidAthlete(): Promise<Event[]> {
		return this.find({
			where: {
				isActive: true,
			},
			order: {
				positionInList: 'ASC'
			},
		});
	}
}
