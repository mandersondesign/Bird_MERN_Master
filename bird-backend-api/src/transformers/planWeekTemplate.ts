import PlanWeekTemplate from '../models/plan/plan_week_template';
import WorkoutTemplateTransformer from './workoutTemplate';

export default class PlanWeekTemplateTransformer {
	public static transform(week: PlanWeekTemplate) : any {
		return {
			/* eslint-disable */
			plan_week_template_id: week.planWeekTemplateId,
			number_of_week: week.numberOfWeek,
			description: week.description || '',
			workouts: (week.workoutTemplates || []).map((wt) => WorkoutTemplateTransformer.transform(wt)),
			/* eslint-enable */
		};
	}
}
