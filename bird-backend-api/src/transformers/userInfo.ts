import UserInfo from '../models/user/user_info';
import EventTransformer from './event';

export default class UserInfoTransformer {
	public static transform(data: UserInfo) : any {
		/* eslint-disable */
		if (!data) {
			return {
				is_completed: false,
			};
		}

		let personalRecord = {
			k5: data.current5kRecord,
			k10: data.current10kRecord,
			half_marathon: data.currentHalfMarathonRecord,
			marathon: data.currentMarathonRecord,
		}

		if (data.personalRecords) {
			personalRecord = {
				...personalRecord,
				...data.personalRecords,
			}
		}

		return {
			is_completed: data.isCompleted,
			event_type_id: data.eventTypeId,
			event_type: {
				event_type_id: data.eventTypeId,
				name: UserInfo.EVENT_TYPE[data.eventTypeId],
			},
			race_name: data.raceName,
			comment: data.comment,
			level_id: data.levelId,
			level: {
				level_id: data.levelId,
				name: UserInfo.LEVEL[data.levelId],
			},
			event_id: data.eventId,
			event: data.event ? EventTransformer.transform(data.event) : null,
			goal: {
				type: data.goalType,
				value: data.goalTime
			},
			date: data.dateOfRace ? data.dateOfRace.toLocaleString('en-US').split(',')[0] : null,
			past_experience_id: data.pastExperienceId,
			past_experience: {
				past_experience_id: data.pastExperienceId,
				name: UserInfo.PAST_EXPERIENCE[data.pastExperienceId]
			},
			miles_per_week_id: data.milesPerWeekId,
			miles_per_week: {
				miles_per_week_id: data.milesPerWeekId,
				name: UserInfo.MILES_PER_WEEK[data.milesPerWeekId]
			},
			long_distance_id: data.longDistanceId,
			long_distance: {
				long_distance_id: data.longDistanceId,
				name: UserInfo.LONG_DISTANCE[data.longDistanceId]
			},
			personal_record: personalRecord,
			personal_goal_id: data.importantGoalId,
			days: data.days || [],
			custom_questions: data.customQuestions,
			/* eslint-enable */
		};
	}
}
