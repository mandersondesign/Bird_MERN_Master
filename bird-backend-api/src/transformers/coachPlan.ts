import CoachPlan from '../models/subscription/coach_plan';

export default class CoachPlanTransformer {
	public static transform(plan: CoachPlan) {
		return {
			coach_plan_id: plan.coachPlanId, // eslint-disable-line
			name: plan.name,
			description: plan.description,
			options: plan.options,
			max_athletes: plan.maxAthletes, // eslint-disable-line
			max_templates: plan.maxTemplates, // eslint-disable-line
			trial_days: plan.trialDays, // eslint-disable-line
			price: plan.price,
		};
	}
}
