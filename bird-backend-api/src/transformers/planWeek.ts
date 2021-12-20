import PlanWeek from '../models/plan/plan_week';
import WorkoutTransformer from './workout';

export default class PlanWeekTransformer {
	public static transform(week: PlanWeek) : any {
		return {
			/* eslint-disable */
			week_id: week.planWeekId,
			miles_per_week: week.workouts ? week.workouts.reduce((sum, workout) => sum + Number(workout.distance), 0) : 0,
			completed_miles_per_week: week.workouts ? week.workouts.reduce((sum, workout) => sum + Number(workout.completedDistance), 0) : 0,
			minutes_per_week: week.workouts ? week.workouts.reduce((sum, workout) => sum + Number(workout.time), 0)/60 : 0,
			completed_minutes_per_week: week.workouts ? week.workouts.reduce((sum, workout) => sum + Number(workout.movingTime), 0)/60 : 0,
			number_of_week: week.numberOfWeek,
			description: week.description || '',
			workouts: (week.workouts || []).map((workout) => WorkoutTransformer.transform(workout)),
			is_published: true, // legacy
			/* eslint-enable */
		};
	}
}
