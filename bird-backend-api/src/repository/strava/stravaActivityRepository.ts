import {EntityRepository, Repository} from 'typeorm';
import StravaActivity from '../../models/strava/activity';

@EntityRepository(StravaActivity)
export default class StravaActivityRepository extends Repository<StravaActivity> {

	public findById(activityId: number): Promise<StravaActivity> {
		return this.findOne({
			where: { activityId },
		});
	}

	public listByDate(date: Date): Promise<StravaActivity[]> {
		return this.createQueryBuilder('activity')
			.where(`activity.start_date > '${date.toLocaleString('en-US').split(',')[0]}'`)
			.getMany();
	}

	public async findByStravaAthleteId(stravaAthleteId: number, to: string): Promise<StravaActivity[]> {
		const activities = await this.createQueryBuilder('activity')
			.where(`activity.strava_athlete_id = ${stravaAthleteId}`)
			.andWhere(`activity.start_date <= '${to}T23:59:59'`)
			.orderBy({
				'activity.start_date': 'DESC',
				'activity.activity_id': 'DESC',
			})
			.take(10)
			.getMany();

		if (!activities || activities.length === 0) {
			return [];
		}

		const lastActivityDay = activities[0].startDate.toLocaleString('en-US').split(',')[0];
		const activitiesForLastDay = activities.filter((a) => a.startDate.toLocaleString('en-US').split(',')[0] === lastActivityDay);

		if (activitiesForLastDay.length >= 3) {
			return activitiesForLastDay;
		}

		return activities.slice(0, 3);
	}

	public add({
		activityId,
		stravaAthleteId,
		name,
		completedDistance,
		movingTime,
		elapsedTime,
		startDate
	}) : Promise<StravaActivity>{
		return this.save({
			activityId,
			stravaAthleteId,
			name,
			completedDistance,
			movingTime,
			elapsedTime,
			startDate,
		});
	}
}
