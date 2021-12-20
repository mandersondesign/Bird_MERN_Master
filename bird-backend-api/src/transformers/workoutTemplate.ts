import WorkoutTemplate from '../models/plan/workout_template';
import timeString from '../utils/timeString';

export default class WorkoutTemplateTransformer {
	public static transform(workout: WorkoutTemplate) : any {
		return {
			/* eslint-disable */
			workout_template_id: workout.workoutTemplateId,
			name: workout.name || '',
			description: workout.description || '',
			distance: Number(workout.distance),
			time: workout.time ? timeString(Number(workout.time)) : null,
			workout_type_id: workout.workoutTypeId,
			workout_type: {
				workout_type_id: workout.workoutTypeId,
				name: workout.workoutType ? workout.workoutType.name : null,
			},
			pace_id: workout.paceId,
			pace: {
				pace_id: workout.paceId,
				// name: workout.pace ? workout.pace.name : null,
			},
			day_number: workout.dayNumber,
			scheduledMessage: workout.scheduledMessage
			/* eslint-enable */
		};
	}
}
