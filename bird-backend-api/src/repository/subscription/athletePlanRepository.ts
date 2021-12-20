import { EntityRepository, Repository } from 'typeorm';
import AthletePlan from '../../models/subscription/athlete_plan';

@EntityRepository(AthletePlan)
export default class AthletePlanRepository extends Repository<AthletePlan> {

	public findById(athletePlanId: number): Promise<AthletePlan> {
		return this.findOne({
			where: { athletePlanId },
		});
	}
	public findByCoachId(coachId: number): Promise<AthletePlan> {
		return this.findOne({
			where: {
				coachId
			}
		});
	}
}
