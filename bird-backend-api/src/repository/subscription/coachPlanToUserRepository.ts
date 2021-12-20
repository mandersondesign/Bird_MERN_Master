import {EntityRepository, Repository} from 'typeorm';
import CoachPlanToUser from '../../models/subscription/coach_plan_to_user';

@EntityRepository(CoachPlanToUser)
export default class CoachPlanToUserRepository extends Repository<CoachPlanToUser> {

	public async getByCoachId(coachId: number) {
		return this.findOne({
			where: {
				coachId,
			},
			relations: ['coachPlan']
		});
	}

	public async set(coachId: number, coachPlanId: number, paidToDate?: Date) {
		const coachToPlan : CoachPlanToUser = await this.findOne({
			where: {
				coachId,
			}
		});

		if (coachToPlan) {
			await this.update(coachToPlan.coachPlanToUserId, {
				paidToDate,
				coachPlanId,
			});
			return coachToPlan.coachPlanToUserId;
		}

		const res = await this.save({
			coachId,
			startDate: new Date(),
			paidToDate,
			coachPlanId,
		});
		return res.coachPlanToUserId;
	}

	public async updatePaidToDate(coachPlanToUserId: number, paidToDate: Date) {
		return this.update(coachPlanToUserId, {
			paidToDate,
			errorMessage: null,
		});
	}

	public async setErrorMessage(coachPlanToUserId: number, errorMessage: string) {
		return this.update(coachPlanToUserId, {
			errorMessage,
		});
	}

	public async removeErrorMessage(coachPlanToUserId: number) {
		return this.update(coachPlanToUserId, {
			errorMessage: null,
		});
	}
}
