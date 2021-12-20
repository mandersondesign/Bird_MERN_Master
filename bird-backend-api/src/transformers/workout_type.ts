import WorkoutType from '../models/plan/workout_type';

export default class WorkoutTypeTransformer {
	public static transform(workoutType: WorkoutType) : any {
		return {
			/* eslint-disable */
			workout_type_id: workoutType.workoutTypeId,
			name: workoutType.name || '',
			/* eslint-enable */
		};
	}
}
