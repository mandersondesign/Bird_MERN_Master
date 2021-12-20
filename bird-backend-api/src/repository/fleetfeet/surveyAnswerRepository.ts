import {EntityRepository, In, Repository} from 'typeorm';
import SurveyAnswer from '../../models/fleetfeet/survey_answer';

@EntityRepository(SurveyAnswer)
export default class SurveyAnswerRepository extends Repository<SurveyAnswer> {

	public addList(answers, userId) {
		return this.save(answers.map((a) => ({
			userId,
			surveyQuestionId: a.survey_question_id,
			answer: a.answer,
		})));
	}

	public markAsNotNew(ids: number[]) {
		return this.update(ids, {
			isNew: false,
		});
	}

	public getNew() : Promise<SurveyAnswer[]>{
		return this.find({
			// where: {
			// 	isNew: true,
			// },
			relations: ['surveyQuestion'],
			order: {
				userId: 'DESC',
			}
		});
	}

	public getLevelByUserId(userId) : Promise<SurveyAnswer>{
		return this.findOne({
			where: {
				userId,
				surveyQuestionId: In([5, 12, 22, 32]), // eslint-disable-line
			},
			order: {
				surveyAnswerId: 'DESC'
			}
		});
	}
}
