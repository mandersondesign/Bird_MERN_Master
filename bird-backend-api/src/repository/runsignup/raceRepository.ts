import {EntityRepository, Repository} from 'typeorm';
import RunSignupRace from '../../models/runsignup/race';

@EntityRepository(RunSignupRace)
export default class RunSignupRaceRepository extends Repository<RunSignupRace> {

	public findByRsuRaceId(rsuRaceId: number): Promise<RunSignupRace> {
		return this.findOne({
			where: { rsuRaceId },
		});
	}
}
