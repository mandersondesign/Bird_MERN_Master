import {Column,Entity,OneToMany,PrimaryGeneratedColumn} from 'typeorm';
import Workout from './workout';
import UserPace from './user_pace';


@Entity('pace' ,{schema:'plan' } )
export default class Pace {

	@PrimaryGeneratedColumn({
		type:'integer',
		name:'pace_id'
	})
	public paceId:number;

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
		name:'coach_id'
	})
	public coachId:number | null;

	@Column('timestamp without time zone',{
		nullable:false,
		default: () => 'now()',
		name:'created_at'
	})
	public createdAt:Date;

	@OneToMany(()=>Workout, (workout: Workout)=>workout.pace)
	public workouts:Workout[];

	@OneToMany(()=>UserPace, (userPace: UserPace)=>userPace.pace)
	public userPace:UserPace[];
}
