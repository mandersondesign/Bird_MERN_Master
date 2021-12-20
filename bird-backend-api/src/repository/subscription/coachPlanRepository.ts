import {EntityRepository, Repository} from 'typeorm';
import CoachPlan from '../../models/subscription/coach_plan';

@EntityRepository(CoachPlan)
export default class CoachPlanRepository extends Repository<CoachPlan> {

	public findById(coachPlanId: number): Promise<CoachPlan> {
		return this.findOne({
			where: { coachPlanId },
		});
	}

	public list(showAll = false): Promise<CoachPlan[]> {
		const where : any = {
			isActive: true,
		};

		if (!showAll) {
			where.isPublic = true;
		}

		return this.find({
			where,
			order: {
				coachPlanId: 'ASC'
			},
		});
	}
}
