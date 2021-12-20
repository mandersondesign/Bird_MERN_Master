import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import User from '../user/user';
import SurveyQuestion from './survey_question';

@Entity('survey_answer', { schema: 'fleetfeet' })
export default class SurveyAnswer {

	@PrimaryGeneratedColumn({
		type: 'integer',
		name: 'survey_answer_id'
	})
	public surveyAnswerId: number;

	@ManyToOne(() => User, (user) => user.userId)
	@JoinColumn({ name: 'user_id' })
	public user: User;

	@Column('integer', {
		nullable: false,
		name: 'user_id'
	})
	public userId: number;

	@ManyToOne(() => SurveyQuestion, (sq) => sq.surveyQuestionId)
	@JoinColumn({ name: 'survey_question_id' })
	public surveyQuestion: SurveyQuestion;

	@Column('integer', {
		nullable: false,
		name: 'survey_question_id'
	})
	public surveyQuestionId: number;

	@Column('character varying', {
		nullable: true,
		name: 'answer'
	})
	public answer: string;

	@Column('boolean',{
		nullable:false,
		default: () => 'true',
		name:'is_new'
	})
	public isNew: boolean;

}
