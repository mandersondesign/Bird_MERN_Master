import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('split', { schema: 'strava' })
export default class StravaSplit {

	@PrimaryGeneratedColumn({
		type:'integer',
		name:'strava_split_id'
	})
	public stravaSplitId:number;

	@Column('bigint', {
		nullable: false,
		name: 'activity_id'
	})
	public activityId: string; // strava object/activity id

	@Column('integer',{
		nullable:false,
		name:'strava_athlete_id'
	})
	public stravaAthleteId: number;

	@Column('numeric',{
		nullable:true,
		precision:5,
		scale:3,
		name:'avg_speed'
	})
	public averageSpeed:number;

	@Column('numeric',{
		nullable:true,
		precision:5,
		scale:3,
		name:'distance'
	})
	public distance:number;

	@Column('bigint',{
		nullable:true,
		name:'moving_time'
	})
	public movingTime:number;

	@Column('bigint',{
		nullable:true,
		name:'elapsed_time'
	})
	public elapsedTime:number;

	@Column('integer',{
		nullable:true,
		name:'split'
	})
	public split:number;


}
