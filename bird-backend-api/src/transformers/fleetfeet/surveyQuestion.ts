import SurveyQuestion from '../../models/fleetfeet/survey_question';

export default class FleetfeetSurveyQuestion {
	public static transform(sq: SurveyQuestion) {
		return {
			survey_question_id: sq.surveyQuestionId, // eslint-disable-line
			title: sq.question,
			options: sq.options,
			type: sq.type,
			has_other: sq.hasOther, // eslint-disable-line
		};
	}
}
