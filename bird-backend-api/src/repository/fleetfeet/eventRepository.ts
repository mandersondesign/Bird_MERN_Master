import {EntityRepository, Repository} from 'typeorm';
import Event from '../../models/fleetfeet/event';

@EntityRepository(Event)
export default class FleetFeetEventRepository extends Repository<Event> {

	public findById(eventId: number): Promise<Event> {
		return this.findOne({
			where: { eventId },
		});
	}

	public async findByAlias(alias): Promise<Event> {
		if (!alias) {
			return null;
		}

		const sql = `SELECT event_id
					FROM "fleetfeet"."event"
					WHERE lower(alias) = $1`;

		const data = await this.query(sql, [alias.toLowerCase().trim()]);

		if (!data.length) {
			return null;
		}

		return this.findOne(data[0].event_id, {
			relations: ['planTemplate'],
		});
	}
}
