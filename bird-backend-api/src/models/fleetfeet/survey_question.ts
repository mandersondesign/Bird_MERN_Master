import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('survey_question', { schema: 'fleetfeet' })
export default class SurveyQuestion {

	@PrimaryColumn('integer', {
		nullable: false,
		name: 'survey_question_id'
	})
	public surveyQuestionId: number;

	@Column('character varying', {
		nullable: false,
		name: 'question'
	})
	public question: string;

	@Column('simple-array', {
		nullable: true,
		array: true,
		name: 'options'
	})
	public options: string[];

	@Column('character varying', {
		nullable: false,
		default: 'radio',
		name: 'type'
	})
	public type: string;

	@Column({
		default: false,
		name: 'has_other',
	})
	public hasOther: boolean;

	@Column('integer',{
		nullable:false,
		default: 1,
		name:'event_type_id'
	})
	public eventTypeId:number;
}
