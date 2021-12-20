import PlanPhaseTransformer from './planPhase';
import Plan from '../models/plan/plan';
import Program from '../models/plan/program';
import CoachTransformer from './coach';
import EventTransformer from './event';
import UserInfo from '../models/user/user_info';
const moment = require('moment');  // eslint-disable-line

export default class PlanTransformer {
	public static transform(plan: Plan, userInfo: UserInfo, phases: any[], sumOfMiles: number, program: Program, status: string, planEndDate: number) : any {
		const event = plan.event || (userInfo ? userInfo.event : null);

		return {
			/* eslint-disable */
			plan_id: plan.planId,
			name: plan.name,
			athlete_id: plan.athleteId,
			coach_id: plan.coachId,
			coach: plan.coach ? CoachTransformer.transform(plan.coach) : null,
			event: event ? EventTransformer.transform(event) : null,
			goal: {
				time: userInfo ? userInfo.goalTime : null,
				type: userInfo ? userInfo.goalType : null,
			},
			date: userInfo && userInfo.dateOfRace ? userInfo.dateOfRace.toLocaleString('en-US').split(',')[0] : null,
			weeks: plan.planWeeks ? plan.planWeeks.length : null,
			miles: Number(sumOfMiles.toFixed(2)),
			phases: (phases || []).map((phase) => PlanPhaseTransformer.transform(phase)), // group of phases
			start_date: plan.startDate ? plan.startDate : null,
			end_date: planEndDate ?  moment(planEndDate).format('yyyy-MM-DD') : null,
			min_miles_per_week: plan.min ? Number(plan.min) : null,
			max_miles_per_week: plan.max ? Number(plan.max) : null,
			has_pain: plan.hasPain,
			status,
			scheduled_message: plan.scheduledMessage,
			program
			/* eslint-enable */
		};
	}

	public static shortTransform(plan: Plan) : any {
		return {
			/* eslint-disable */
			plan_id: plan.planId,
			name: plan.name,
			athlete_id: plan.athleteId,
			coach_id: plan.coachId,
			event_id: plan.event,
			has_pain: plan.hasPain,
			plan_template_id: plan.planTemplateId,
			is_active: plan.isActive,
			scheduled_message: plan.scheduledMessage,
			/* eslint-enable */
		};
	}
}
