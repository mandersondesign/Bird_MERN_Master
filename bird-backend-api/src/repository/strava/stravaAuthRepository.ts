import {EntityRepository, Repository} from 'typeorm';
import StravaAuth from '../../models/strava/auth';

@EntityRepository(StravaAuth)
export default class StravaAuthRepository extends Repository<StravaAuth> {

	public findByUserId(userId: number): Promise<StravaAuth> {
		return this.findOne({
			where: { userId },
			relations: ['stravaAthlete'],
		});
	}

	public findByStravaAthleteId(stravaAthleteId: number): Promise<StravaAuth> {
		return this.findOne({
			where: { stravaAthleteId },
		});
	}

	public deleteByUserId(userId: number){
		return this.delete({
			userId,
		});
	}

	public deleteByStravaAthleteId(stravaAthleteId: number){
		return this.delete({
			stravaAthleteId,
		});
	}

	public add({
		userId,
		stravaAthleteId,
		name,
	}) : Promise<StravaAuth>{
		return this.save({
			userId,
			stravaAthleteId,
			name,
		});
	}
}
