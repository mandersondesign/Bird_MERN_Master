import User from '../models/user/user';
import CoachInfoTransformer from './coachInfo';

export default class CoachTransformer {
	public static transform(user: User) : any {
		return {
			/* eslint-disable */
			user_id: user.userId,
			email: user.email,
			name: user.firstName + (user.lastName ? (' ' + user.lastName) : ''),
			first_name: user.firstName,
			last_name: user.lastName || '',
			phone: user.phone,
			user_type_id: user.userTypeId,
			is_active: user.isActive,
			info: CoachInfoTransformer.transform(user.coachInfo, user.avatar),
			is_sms_enabled: user.isSmsEnabled,
			/* eslint-enable */
		};
	}
}
