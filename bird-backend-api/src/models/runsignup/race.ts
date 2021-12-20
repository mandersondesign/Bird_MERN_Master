import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import RunSignupParticipant from './participant';

@Entity('race', { schema: 'runsignup' })
export default class RunSignupRace {

	@PrimaryGeneratedColumn({
		type: 'integer',
		name: 'race_id'
	})
	public raceId: number;

	@Column('character varying', {
		nullable: false,
		name: 'name'
	})
	public name: string;

	@Column('character varying', {
		nullable: false,
		name: 'newsletter_tag'
	})
	public newsletterTag: string;

	@Column('date', {
		nullable: true,
		name: 'end_after_date'
	})
	public endAfterDate: Date | null;

	@Column('integer', {
		nullable: false,
		name: 'rsu_race_id'
	})
	public rsuRaceId: number;

	@Column('character varying', {
		nullable: false,
		name: 'api_key',
	})
	public apiKey: string;

	@Column('character varying', {
		nullable: false,
		name: 'api_secret',
	})
	public apiSecret: string;

	@Column('character varying', {
		nullable: true,
		name: 'google_file_id'
	})
	public googleFileId: string | null;

	@Column('integer', {
		name: 'last_registration_id',
		default: 1
	})
	public lastRegistrationId: number;

	@Column('character varying', {
		nullable: true,
		name: 'events'
	})
	public events: string | null;

	@OneToMany(() => RunSignupParticipant, (participant) => participant.race)
	public participants: RunSignupParticipant;
}
