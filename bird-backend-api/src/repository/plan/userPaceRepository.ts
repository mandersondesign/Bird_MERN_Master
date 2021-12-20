import {EntityRepository, Repository} from 'typeorm';
import UserPace from '../../models/plan/user_pace';

@EntityRepository(UserPace)
export default class UserPaceRepository extends Repository<UserPace> {

	public findByPlanId(planId: number): Promise<UserPace[]> {
		return this.find({
			where: { planId },
			relations: ['pace']
		});
	}

	public updateOnePace(userPaceId: number, {
		value
	}){
		return this.update(userPaceId, {
			value
		});
	}

	public createOnePace({
		planId,
		paceId,
		value
	}) : Promise<UserPace>{
		return this.save({
			planId,
			paceId,
			value
		});
	}
}
