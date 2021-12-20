import User from '../models/user/user';
import UserInfoTransformer from './userInfo';
import PlanTransformer from './plan';
import LastActivity from '../models/user/last_activity';
import LastActivityType from '../models/user/last_activity_type';
import WorkoutTransformer from './workout';

const MIN_RISK = 3;

export default class AthleteTransformer {
	/* eslint-disable */
	public static transform(user: User): any {
		const res: any = {
			user_id: user.userId,
			email: user.email,
			name: user.firstName + (user.lastName ? (' ' + user.lastName) : ''),
			first_name: user.firstName,
			last_name: user.lastName || '',
			phone: user.phone,
			is_active: user.isActive,
			is_sms_enabled: user.isSmsEnabled,
			is_onboarding_completed: Boolean(user.isOnboardingCompleted),
			avatar: user.avatar || 'https://static.bird.coach/resources/userpic.png',
			last_activity: user.lastActivity && user.lastActivity[0] ? user.lastActivity[0].date : null,
			last_activity_text: this._transfromLastActivityText(user.lastActivity && user.lastActivity[0]),
			last_activity_type: user.lastActivity && user.lastActivity[0] ? user.lastActivity[0].lastActivityType : null,
			last_activity_workout: user.lastActivity && user.lastActivity[0] && user.lastActivity[0].workout ? WorkoutTransformer.transform(user.lastActivity[0].workout) : null,
			is_paid: user.isPaid,
			is_assignable: user.isPaid, // TODO: and no active plan
		}

		if (user.stravaAuth) {
			res.is_strava_connected = true;
			res.strava_account_name = user.stravaAuth.name;
		}

		if (user.userInfo && user.userInfo[0]) {
			res.user_info = UserInfoTransformer.transform(user.userInfo[0])
		}

		if (user.planOfAthlete && user.planOfAthlete.length > 0) {
			let currentPlan = user.planOfAthlete.find(p => p.isActive)
			if (!currentPlan) {
				currentPlan = user.planOfAthlete.pop();
			}
			res.plan = PlanTransformer.shortTransform(currentPlan);
		}

		if (user.messages) {
			if (user.messages.length > 0) {
				res.last_message = user.messages.length > 0 ? user.messages.pop() : null
			}
		}

		return res;
	}
	/* eslint-enable */

	public static fullTransform(user: User, weeksUntilRace): any {
		const plan = user.planOfAthlete ? user.planOfAthlete[0] : null;
		const currentWeek = plan && plan.planWeeks ? plan.planWeeks.find((w) => w.workouts && w.workouts.length > 0) : null;

		const workouts = currentWeek && currentWeek.workouts ? currentWeek.workouts : [];

		const keyWorkouts = (workouts || [])
			.filter((w) => w.isMarkedAsKey)
			.map((w) => ({
				date: Number(new Date(w.date)),
				name: w.workoutType ? w.workoutType.name : w.name,
				workout_status_id: w.workoutStatusId, // eslint-disable-line
			}))
			.sort((w1, w2) => w1.date - w2.date);

		/* eslint-disable */
		const res: any = {
			user_id: user.userId,
			email: user.email,
			name: user.firstName + (user.lastName ? (' ' + user.lastName) : ''),
			first_name: user.firstName,
			last_name: user.lastName || '',
			phone: user.phone,
			is_active: user.isActive,
			is_sms_enabled: user.isSmsEnabled,
			is_onboarding_completed: Boolean(user.isOnboardingCompleted),
			avatar: user.avatar || 'https://static.bird.coach/resources/userpic.png',
			last_activity: user.lastActivity && user.lastActivity[0] ? user.lastActivity[0].date : null,
			last_activity_text: this._transfromLastActivityText(user.lastActivity && user.lastActivity[0]),
			risk_level: Number(user.preRisk) || MIN_RISK,
			weeks_until_race: weeksUntilRace,
			tempo: null,
			speed: null,
			long: null,
			key_workouts: keyWorkouts,
			is_paid: user.isPaid,
			is_assignable: user.isPaid && !plan,
			can_publish: false, //  lecacy: user can't publish week, bcs all week are published by default
			has_pain: Boolean(plan && plan.hasPain),
		};

		if (user.userInfo && user.userInfo[0]) {
			res.user_info = UserInfoTransformer.transform(user.userInfo[0]);
		}

		if (user.stravaAuth) {
			res.is_strava_connected = true;
			res.strava_account_name = user.stravaAuth.name;
		}

		/* eslint-enable */

		return res;

	}

	public static transformMessages(user: User, coachId: number) {
		user.messages = user.messages.filter(msg => (msg.coachId === coachId) || (msg.coachId === null && msg.plan?.coachId === coachId)).filter(msg => msg.isFromAthlete);
		user.messages = user.messages.sort((a,b) => a.messageId - b.messageId);
		return user;
	}

	private static _transfromLastActivityText(lastActivity: LastActivity) {
		if (!lastActivity) {
			return null;
		}

		if (lastActivity.lastActivityTypeId === LastActivityType.WORKOUT_COMPLETED) {
			return `Workout ${lastActivity.comment} completed`;
		}

		return lastActivity.lastActivityType.name;
	}
}
