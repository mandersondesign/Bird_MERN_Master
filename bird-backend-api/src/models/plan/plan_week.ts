import {Column,Entity,JoinColumn,ManyToOne,OneToMany,PrimaryGeneratedColumn} from 'typeorm';
import Plan from './plan';
import Phase from './phase';
import Workout from './workout';

@Entity('plan_week' ,{schema:'plan' } )
export default class PlanWeek {

	@PrimaryGeneratedColumn({
		type:'integer',
		name:'plan_week_id'
	})
	public planWeekId:number;

	@ManyToOne(()=>Plan, (plan: Plan)=>plan.planWeeks,{  nullable:false, })
	@JoinColumn({ name:'plan_id'})
	public plan:Plan;

	@Column('integer',{
		nullable:false,
		name:'plan_id'
	})
	public planId:number;

	@ManyToOne(()=>Phase, (phase: Phase)=>phase.planWeeks,{  nullable:false, })
	@JoinColumn({ name:'phase_id'})
	public phase:Phase;

	@Column('integer',{
		nullable:false,
		name:'phase_id'
	})
	public phaseId:number;

	@Column('integer',{
		nullable:false,
		name:'number_of_week'
	})
	public numberOfWeek:number;

	@Column('integer',{
		nullable:true,
		name:'number_of_phase'
	})
	public numberOfPhase:number | null;

	@Column('character varying',{
		nullable:false,
		default: () => '\'\'',
		name:'description'
	})
	public description:string;

	@Column({
		name: 'is_published',
		default: false,
	})
	public isPublished: boolean;

	@OneToMany(()=>Workout, (workout: Workout)=>workout.planWeek)
	public workouts:Workout[];

}
