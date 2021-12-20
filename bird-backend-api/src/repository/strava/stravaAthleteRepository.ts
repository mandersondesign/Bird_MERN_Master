import {EntityRepository, Repository} from 'typeorm';
import StravaAthlete from '../../models/strava/athlete';

@EntityRepository(StravaAthlete)
export default class StravaAthleteRepository extends Repository<StravaAthlete> {

	public findByStravaAthleteId(stravaAthleteId: number): Promise<StravaAthlete> {
		return this.findOne({
			where: { stravaAthleteId },
		});
	}

	public async set({
		stravaAthleteId,
		refreshToken,
		accessToken,
		expiresAt,
	}){

		const athlete = await this.findOne(stravaAthleteId);

		if (athlete) {
			return this.update(stravaAthleteId, {
				refreshToken,
				accessToken,
				expiresAt,
			});
		}

		return this.insert({
			stravaAthleteId,
			refreshToken,
			accessToken,
			expiresAt,
		});
	}
}
