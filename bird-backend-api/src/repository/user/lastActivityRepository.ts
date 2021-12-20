import {EntityRepository, Repository} from 'typeorm';
import LastActivity from '../../models/user/last_activity';

@EntityRepository(LastActivity)
export default class LastActivityRepository extends Repository<LastActivity> {

	public async set(userId: number, lastActivityTypeId: number, comment?: string, workoutId: number = null) {
		const activity = await this.findOne(userId);

		if (activity) {
			return this.update(userId, {
				date: new Date(),
				lastActivityTypeId,
				comment,
				workoutId
			});
		}

		return this.insert({
			userId,
			date: new Date(),
			lastActivityTypeId,
			comment,
			workoutId
		});
	}
}
