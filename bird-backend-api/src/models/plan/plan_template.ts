import {Column,Entity,OneToMany,PrimaryGeneratedColumn} from 'typeorm';
import Plan from './plan';
import PlanPhaseTemplate from './plan_phase_template';

@Entity('plan_template' ,{schema:'plan' } )
export default class PlanTemplate {

	@PrimaryGeneratedColumn({
		type:'integer',
		name:'plan_template_id'
	})
	public planTemplateId:number;

	@Column('character varying',{
		nullable:false,
		name:'name'
	})
	public name:string;

	@Column('integer',{
		nullable:true,
		name:'event_id'
	})
	public eventId:number;

	@Column('integer',{
		nullable:true,
		name:'coach_id'
	})
	public coachId:number | null;

	@Column({
		default: true,
		name: 'is_active',
	})
	public isActive: boolean;

	@Column('timestamp without time zone',{
		nullable:false,
		default: () => 'now()',
		name:'last_update'
	})
	public lastUpdate: Date;

	@Column('character varying',{
		nullable:true,
		name:'push_title'
	})
	public pushTitle:string;

	@Column('character varying',{
		nullable:true,
		name:'push_message'
	})
	public pushMessage:string;

	@Column('character varying',{
		nullable:true,
		name:'channel_url'
	})
	public channelUrl:string;

	@Column('character varying', {
		nullable: true,
		name: 'scheduled_message'
	})
	public scheduledMessage: string;

	@OneToMany(()=>Plan, (plan: Plan)=>plan.planTemplate)
	public plans:Plan[];

	@OneToMany(()=>PlanPhaseTemplate, (planPhaseTemplate: PlanPhaseTemplate)=>planPhaseTemplate.planTemplate)
	public planPhaseTemplates:PlanPhaseTemplate[];

}
