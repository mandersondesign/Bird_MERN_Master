import UserPace from '../models/plan/user_pace';
import PaceTransformer from './pace';

export default class UserPaceTransformer {
	public static transform(item: UserPace) : any {
		return {
			/* eslint-disable */
            user_pace_id: item.userPaceId,
            plan_id: item.planId,
			pace_id: item.paceId,
			pace: item.pace ? PaceTransformer.transform(item.pace) : null,
            value: item.value,
			/* eslint-enable */
		};
	}
}
