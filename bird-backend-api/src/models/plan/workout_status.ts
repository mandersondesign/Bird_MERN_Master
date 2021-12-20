import {Column,Entity,PrimaryGeneratedColumn} from 'typeorm';

@Entity('workout_status' ,{schema:'plan' } )
export default class WorkoutStatus {

	public static readonly NO_RESULTS: number = 1;
	public static readonly DID_IT: number = 2; // eslint-disable-line
	public static readonly DID_NOT_DO_IT: number = 3; // eslint-disable-line
	public static readonly PARTIALLY_DONE: number = 4; // eslint-disable-line

	@PrimaryGeneratedColumn({
		type:'integer',
		name:'workout_status_id'
	})
	public workoutStatusId:number;

	@Column('character varying',{
		nullable:false,
		unique: true,
		name:'name'
	})
	public name:string;
}
