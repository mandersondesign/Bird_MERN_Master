import {Column,Entity,JoinColumn,ManyToOne,OneToMany,PrimaryGeneratedColumn} from 'typeorm';
import PlanTemplate from './plan_template';
import PlanWeekTemplate from './plan_week_template';


@Entity('plan_phase_template' ,{schema:'plan' } )
export default class PlanPhaseTemplate {

	@PrimaryGeneratedColumn({
		type:'integer',
		name:'plan_phase_template_id'
	})
	public planPhaseTemplateId:number;

	@ManyToOne(()=>PlanTemplate, (planTemplate: PlanTemplate)=>planTemplate.planPhaseTemplates,{  nullable:false, })
	@JoinColumn({ name:'plan_template_id'})
	public  planTemplate:PlanTemplate;

	@Column('integer',{
		nullable:false,
		name:'plan_template_id'
	})
	public planTemplateId:number;

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

	@Column('integer',{
		nullable:true,
		name:'number_of_phase'
	})
	public numberOfPhase:number | null;

	@OneToMany(()=>PlanWeekTemplate, (planWeekTemplate: PlanWeekTemplate)=>planWeekTemplate.planPhaseTemplate)
	public planWeekTemplates:PlanWeekTemplate[];

}
