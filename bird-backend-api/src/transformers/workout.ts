import Workout from '../models/plan/workout';
import MessageTransformer from './message';
import timeString from '../utils/timeString';
import timeMMSS from '../utils/timeMMSS';
import WorkoutStatus from '../models/plan/workout_status';

export default class WorkoutTransformer {
	public static transform(workout: Workout) : any {
		let completedDistance = 0;
		if (workout && workout.completedDistance) {
			completedDistance = workout.completedDistance;
		} else if (workout && (workout.workoutStatusId === WorkoutStatus.DID_IT || workout.workoutStatusId === WorkoutStatus.PARTIALLY_DONE)) {
			completedDistance = workout.distance;
		}

		return {
			/* eslint-disable */
			workout_id: workout.workoutId,
			name: workout.name || '',
			description: workout.description || '',
			distance: isNaN(Number(workout.distance)) ? null : Number(workout.distance),
			time: workout.time ? timeString(Number(workout.time)) : null,
			completed_distance: completedDistance ? Number(Number(completedDistance).toFixed(2)) : null,
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
			avg_pace: (workout.avgPace && isFinite(workout.avgPace)) ? timeMMSS(Number(workout.avgPace) * 60) : null,
			date: workout.date,
			status: {
				status_id: workout.workoutStatusId,
				name: workout.workoutStatus ? workout.workoutStatus.name : null,
			},
			message: workout.message ? MessageTransformer.transform(workout.message) : null,
			is_marked_as_key: workout.isMarkedAsKey,
			is_liked: workout.isLiked,
			moving_time: timeString(Number(workout.movingTime)),
			elapsed_time: timeString(Number(workout.elapsedTime)),
			has_result: workout.hasResult,
			scheduled_message: workout.scheduledMessage,
			/* eslint-enable */
		};
	}
}
