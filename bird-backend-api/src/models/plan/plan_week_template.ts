import {Column,Entity,JoinColumn,ManyToOne,OneToMany,PrimaryGeneratedColumn} from 'typeorm';
import PlanPhaseTemplate from './plan_phase_template';
import WorkoutTemplate from './workout_template';


@Entity('plan_week_template' ,{schema:'plan' } )
export default class PlanWeekTemplate {

	@PrimaryGeneratedColumn({
		type:'integer',
		name:'plan_week_template_id'
	})
	public planWeekTemplateId:number;

	@ManyToOne(()=>PlanPhaseTemplate, (planPhaseTemplate: PlanPhaseTemplate)=>planPhaseTemplate.planWeekTemplates,{  nullable:true, })
	@JoinColumn({ name:'plan_phase_template_id'})
	public  planPhaseTemplate:PlanPhaseTemplate;

	@Column('integer',{
		nullable:true,
		name:'plan_phase_template_id'
	})
	public planPhaseTemplateId:number;

	@Column('integer',{
		nullable:true,
		name:'number_of_week'
	})
	public numberOfWeek:number | null;

	@Column('character varying',{
		nullable:false,
		default: () => '\'\'',
		name:'description'
	})
	public description:string;

	@OneToMany(()=>WorkoutTemplate, (workoutTemplate: WorkoutTemplate)=>workoutTemplate.planWeekTemplate)
	public workoutTemplates:WorkoutTemplate[];

}
