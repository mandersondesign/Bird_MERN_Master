import {Column,Entity,JoinColumn,ManyToOne,PrimaryGeneratedColumn} from 'typeorm';
import WorkoutType from './workout_type';
import User from '../user/user';
import Pace from './pace';

@Entity('workout_library' ,{schema:'plan' } )
export default class WorkoutLibrary {

	@PrimaryGeneratedColumn({
		type:'integer',
		name:'workout_library_id'
	})
	public workoutLibraryId:number;

	@Column('integer',{
		nullable:false,
		name:'coach_id'
	})
	public coachId:number;

	@ManyToOne(() => User, (user) => user.userId)
	@JoinColumn({ name: 'coach_id' })
	public coach: User;

	@Column('character varying',{
		nullable:true,
		name:'name'
	})
	public name:string;

	@ManyToOne(()=>WorkoutType, (workoutType: WorkoutType)=>workoutType.workoutTemplates,{  nullable:false, })
	@JoinColumn({ name:'workout_type_id'})
	public workoutType:WorkoutType;

	@Column('integer',{
		nullable:false,
		name:'workout_type_id'
	})
	public workoutTypeId:number;

	@Column('character varying',{
		nullable:false,
		default: () => '\'\'',
		name:'description'
	})
	public description:string;

	@Column('integer',{
		nullable:true,
		name:'pace_id'
	})
	public paceId:number | null;

	@ManyToOne(()=>Pace, (pace: Pace)=>pace.workouts,{  nullable:true, })
	@JoinColumn({ name:'pace_id'})
	public pace:Pace;

	@Column('numeric',{
		nullable:true,
		precision:5,
		scale:3,
		name:'distance'
	})
	public distance:number | null;

	@Column('integer',{
		nullable:true,
		name:'time'
	})
	public time: number;

	@Column('timestamp without time zone',{
		nullable:false,
		default: () => 'now()',
		name:'last_update'
	})
	public lastUpdate: Date;

}
