import User from '../models/user/user';
import UserType from '../models/user/user_type';
import CoachInfo from '../models/user/coach_info';
import CoachPlan from '../models/subscription/coach_plan';

/* eslint-disable */
export default class UserTransformer {
	public static transform(user: User, hasPlan = false, coachInfo? : CoachInfo) : any {
		const res : any = {
			user_id: user.userId,
			email: user.email,
			name: user.firstName + (user.lastName ? (' ' + user.lastName) : ''),
			first_name: user.firstName,
			last_name: user.lastName || '',
			phone: user.phone,
			user_type_id: user.userTypeId,
			is_active: user.isActive,
			is_sms_enabled: user.isSmsEnabled,
			is_email_confirmed: user.isEmailConfirmed,
			is_onboarding_completed: Boolean(user.isOnboardingCompleted),
			is_policy_accepted: Boolean(user.isPolicyAccepted),
		};

		if (user.userTypeId === UserType.ATHLETE) {
			return {
				...res,
				is_strava_connected: user.stravaAuth ? true : false,
				strava_account_name: user.stravaAuth ? user.stravaAuth.name : 'Account Name',
				avatar: user.avatar || 'https://static.bird.coach/resources/userpic.png',
				is_paid: user.isPaid,
				has_plan: hasPlan,
			}
		}

		if (user.userTypeId === UserType.COACH) {
			return {
				...res,
				avatar: user.avatar || (coachInfo && coachInfo.images ? coachInfo.images[0] : null),
				onboarding_step: !user.isOnboardingCompleted ? (coachInfo ? coachInfo.onboardingStep : 1) : null,
				coach_plan: user.isOnboardingCompleted ? {
					coach_plan_id: user.coachPlanToUser ? user.coachPlanToUser.coachPlanId : CoachPlan.ENTERPRISE,
					name: user.coachPlanToUser && user.coachPlanToUser.coachPlan ? user.coachPlanToUser.coachPlan.name : 'Enterprise',
					paid_to_date: user.coachPlanToUser ? user.coachPlanToUser.paidToDate : null,
					error_message: user.coachPlanToUser ? user.coachPlanToUser.errorMessage : null,
					is_active: user.coachPlanToUser ? (
						user.coachPlanToUser.coachPlanId === CoachPlan.FREE ? true :
						(
							user.coachPlanToUser.paidToDate ?
							user.coachPlanToUser.paidToDate < new Date() :false
						)
					) : true
				} : null,
				measurement_id: coachInfo ? coachInfo.measurementId : CoachInfo.MEASUREMENT_ID_MILE,
			}
		}

		res.avatar = user.avatar;

		return res;
	}
}
