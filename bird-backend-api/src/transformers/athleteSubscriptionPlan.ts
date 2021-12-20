import AthletePlan from '../models/subscription/athlete_plan';

export default class AthleteSubscriptionPlanTransformer {
	public static transform(plan: AthletePlan) {
		return {
			athlete_plan_id: plan.athletePlanId, // eslint-disable-line
			name: plan.name,
			price: plan.price,
		};
	}
}
