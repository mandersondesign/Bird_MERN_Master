import WorkoutLibrary from '../models/plan/workout_library';
import timeString from '../utils/timeString';

export default class WorkoutLibraryTransformer {
	public static transform(workout: WorkoutLibrary) : any {
		return {
			/* eslint-disable */
			workout_library_id: workout.workoutLibraryId,
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
				name: workout.pace ? workout.pace.name : null,
				value: workout.pace && workout.pace.userPace && workout.pace.userPace[0] ? workout.pace.userPace[0].value : null,
			},
			coach_id: workout.coachId,
			last_update: workout.lastUpdate,
			/* eslint-enable */
		};
	}
}
