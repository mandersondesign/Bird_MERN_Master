import {Column,Entity,OneToMany,PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import PlanWeek from './plan_week';
import PlanPhaseTemplate from './plan_phase_template';

@Entity('phase' ,{schema:'plan' } )
export default class Phase {

	@PrimaryGeneratedColumn({
		type:'integer',
		name:'phase_id'
	})
	public phaseId:number;

	@Column('character varying',{
		nullable:false,
		name:'name'
	})
	public name:string;

	@Column('character varying',{
		nullable:false,
		default: () => '\'\'',
		name:'description'
	})
	public description:string;

	// TODO: BIRD-576 remove?
	@Column('integer',{
		nullable:true,
		name:'coach_id'
	})
	public coachId:number | null;

	@Column('integer',{
		nullable:true,
		name:'number_of_phase'
	})
	public numberOfPhase:number | null;

	@Column('timestamp without time zone',{
		nullable:false,
		default: () => 'now()',
		name:'created_at'
	})
	public createdAt:Date;

	@ManyToOne(()=>PlanPhaseTemplate, (planPhaseTemplate: PlanPhaseTemplate)=>planPhaseTemplate.planWeekTemplates,{  nullable:true, })
	@JoinColumn({ name:'plan_phase_template_id'})
	public  planPhaseTemplate:PlanPhaseTemplate;

	@Column('integer',{
		nullable:true,
		name:'plan_phase_template_id'
	})
	public planPhaseTemplateId:number;

	@OneToMany(()=>PlanWeek, (planWeek: PlanWeek)=>planWeek.phase)
	public planWeeks:PlanWeek[];

}
