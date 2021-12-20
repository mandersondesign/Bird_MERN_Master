import CoachInfo from '../models/user/coach_info';

export default class CoachInfoTransformer {
	public static transform(info: CoachInfo, avatar?: string) : any {
		if (!info) {
			return {
				specialties: [],
				about: '',
				images: [],
				measurement_id: info ? info.measurementId : CoachInfo.MEASUREMENT_ID_MILE, // eslint-disable-line
				custom_questions: [], // eslint-disable-line
			};
		}

		return {
			specialties: info.specialties,
			about: info.about,
			images: (info.images || []).length ? info.images : [avatar],
			measurement_id: info ? info.measurementId : CoachInfo.MEASUREMENT_ID_MILE, // eslint-disable-line
			custom_questions: info.customQuestions || [], // eslint-disable-line
		};
	}
}
