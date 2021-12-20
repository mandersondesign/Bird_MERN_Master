import {EntityRepository, Repository} from 'typeorm';
import StravaSplit from '../../models/strava/split';

@EntityRepository(StravaSplit)
export default class StravaSplitRepository extends Repository<StravaSplit> {

	public findByActivityId(activityId: string): Promise<StravaSplit[]> {
		return this.find({
			where: { activityId },
			order: {
				split: 'ASC',
				stravaSplitId: 'ASC',
			}
		});
	}

	public addList({ activityId, stravaAthleteId }, splits: any[]): Promise<StravaSplit[]> {
		return this.save(splits.map((split) => ({
			activityId,
			stravaAthleteId,
			averageSpeed: split.average_speed,
			distance: Number(split.distance) / 1000,
			movingTime: split.moving_time,
			elapsedTime: split.elapsed_time,
			split: split.split
		})));
	}

	public deleteAcitivityData({ activityId, stravaAthleteId }) {
		return this.delete({
			activityId,
			stravaAthleteId,
		});
	}
}
