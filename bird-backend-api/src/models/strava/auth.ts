import { Column, Entity, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import User from '../user/user';
import StravaAthlete from './athlete';

@Entity('auth', { schema: 'strava' })
export default class StravaAuth {

	@PrimaryColumn('integer', {
		nullable: false,
		name: 'user_id'
	})
	public userId: number;

	@OneToOne(() => User, (user) => user.userId)
	@JoinColumn({ name: 'user_id' })
	public user: User;

	@Column('integer',{
		nullable:false,
		name:'strava_athlete_id'
	})
	public stravaAthleteId: number;

	@OneToOne(() => StravaAthlete, (athlete) => athlete.stravaAthleteId)
	@JoinColumn({ name: 'strava_athlete_id' })
	public stravaAthlete: StravaAthlete;

	@Column('timestamp without time zone',{
		name:'created_at',
		default: () => 'now()'
	})
	public createdAt: Date;

	@Column('character varying', {
		nullable: false,
		default: 'Account Name',
		name: 'name'
	})
	public name: string;
}
