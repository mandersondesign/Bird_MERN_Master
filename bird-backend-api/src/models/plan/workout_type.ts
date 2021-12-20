import {Column,Entity,Index,OneToMany,PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import Workout from './workout';
import WorkoutTemplate from './workout_template';
import User from '../user/user';

@Entity('workout_type' ,{schema:'plan' } )
@Index('workout_type_name_key',['name',],{unique:true})
export default class WorkoutType {

	public static readonly TEMPO: number = 1;
	public static readonly SPEED: number = 2; // eslint-disable-line
	public static readonly LONG_RUN: number = 3; // eslint-disable-line
	public static readonly RECOVERY: number = 5; // eslint-disable-line
	public static readonly X_CROSS: number = 6; // eslint-disable-line
	public static readonly BENCHMARK: number = 7; // eslint-disable-line
	public static readonly REST: number = 8; // eslint-disable-line
	public static readonly RACE_PACE: number = 9; // eslint-disable-line

	@PrimaryGeneratedColumn({
		type:'integer',
		name:'workout_type_id'
	})
	public workoutTypeId:number;

	@Column('character varying',{
		nullable:false,
		name:'name'
	})
	public name:string;

	@Column('integer',{
		nullable:true,
		name:'coach_id'
	})
	public coachId:number;

	@ManyToOne(() => User, (user) => user.userId)
	@JoinColumn({ name: 'coach_id' })
	public coach: User;

	@OneToMany(()=>Workout, (workout: Workout)=>workout.workoutType)
	public workouts:Workout[];

	@OneToMany(()=>WorkoutTemplate, (workoutTemplate: WorkoutTemplate)=>workoutTemplate.workoutType)
	public workoutTemplates:WorkoutTemplate[];
}
