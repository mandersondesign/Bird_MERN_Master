import {EntityRepository, Repository} from 'typeorm';
import SurveyQuestion from '../../models/fleetfeet/survey_question';

@EntityRepository(SurveyQuestion)
export default class SurveyQuestionRepository extends Repository<SurveyQuestion> {

	public findAll() : Promise<SurveyQuestion[]>{
		return this.find();
	}
}
