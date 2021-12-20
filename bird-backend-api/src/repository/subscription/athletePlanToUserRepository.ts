import {EntityRepository, Repository} from 'typeorm';
import AthletePlanToUser from '../../models/subscription/athlete_plan_to_user';

@EntityRepository(AthletePlanToUser)
export default class AthletePlanToUserRepository extends Repository<AthletePlanToUser> {

	public async getByAthleteId(athleteId: number) {
		return this.findOne({
			where: {
				athleteId,
			},
			relations: ['athletePlan']
		});
	}

	public async set(athleteId: number, athletePlanId: number, paidToDate?: Date) {
		const athleteToPlan : AthletePlanToUser = await this.findOne({
			where: {
				athleteId,
			}
		});

		if (athleteToPlan) {
			await this.update(athleteToPlan.athletePlanToUserId, {
				paidToDate,
				athletePlanId,
			});
			return athleteToPlan.athletePlanToUserId;
		}

		const res = await this.save({
			athleteId,
			startDate: new Date(),
			paidToDate,
			athletePlanId,
		});
		return res.athletePlanToUserId;
	}

	public async updatePaidToDate(athletePlanToUserId: number, paidToDate: Date) {
		return this.update(athletePlanToUserId, {
			paidToDate,
			errorMessage: null,
		});
	}

	public async setErrorMessage(athletePlanToUserId: number, errorMessage: string) {
		return this.update(athletePlanToUserId, {
			errorMessage,
		});
	}

	public async removeErrorMessage(athletePlanToUserId: number) {
		return this.update(athletePlanToUserId, {
			errorMessage: null,
		});
	}
}
