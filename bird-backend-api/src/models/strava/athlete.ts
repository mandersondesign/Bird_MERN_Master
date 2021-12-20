import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('athlete', { schema: 'strava' })
export default class StravaAthlete {

	@PrimaryColumn('integer', {
		nullable: false,
		name:'strava_athlete_id'
	})
	public stravaAthleteId: number;

	@Column('character varying', {
		nullable: false,
		name: 'refresh_token'
	})
	public refreshToken: string;

	@Column('character varying', {
		nullable: false,
		name: 'access_token'
	})
	public accessToken: string;

	@Column('timestamp without time zone',{
		nullable: true,
		name:'expires_at'
	})
	public expiresAt: Date;

	@Column('timestamp without time zone',{
		name:'created_at',
		default: () => 'now()'
	})
	public createdAt: Date;

}
