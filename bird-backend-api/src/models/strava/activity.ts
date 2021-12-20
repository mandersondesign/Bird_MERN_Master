import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('activity', { schema: 'strava' })
export default class StravaActivity {

	@PrimaryColumn('bigint', {
		nullable: false,
		name: 'activity_id'
	})
	public activityId: string; // strava object/activity id

	@Column('integer',{
		nullable:false,
		name:'strava_athlete_id'
	})
	public stravaAthleteId: number;

	@Column('character varying', {
		nullable: false,
		name: 'name'
	})
	public name: string;

	@Column('numeric',{
		nullable:true,
		precision:5,
		scale:3,
		name:'completed_distance'
	})
	public completedDistance:number;

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

	@Column('timestamp without time zone',{
		name:'start_date',
		default: () => 'now()'
	})
	public startDate: Date;

}
