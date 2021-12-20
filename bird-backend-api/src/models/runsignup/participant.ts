import {Column, Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import RunSignupRace from './race';

@Entity('participant', { schema:'runsignup' })
export default class RunSignupParticipant {

	@PrimaryGeneratedColumn({
		type: 'integer',
		name: 'participant_id'
	})
	public participantId: number;

	@Column('integer', {
		nullable: true,
		name: 'rsu_user_id'
	})
	public rsuUserId: number | null;

	@Column('character varying', {
		nullable: true,
		name: 'first_name'
	})
	public firstName: string | null;

	@Column('character varying', {
		nullable: true,
		name: 'middle_name'
	})
	public middleName: string | null;

	@Column('character varying', {
		nullable: true,
		name: 'last_name'
	})
	public lastName: string | null;

	@Column('character varying', {
		nullable: true,
		name: 'email'
	})
	public email: string | null;

	@Column('character varying', {
		nullable: true,
		name: 'dob'
	})
	public dob: string | null;

	@Column('integer', {
		nullable: true,
		name: 'age'
	})
	public age: number | null;

	@Column('character varying', {
		nullable: true,
		name: 'gender'
	})
	public gender: string | null;

	@Column('character varying', {
		nullable: true,
		name: 'phone'
	})
	public phone: string | null;

	@Column('character varying', {
		nullable: true,
		name: 'street'
	})
	public street: string | null;

	@Column('character varying', {
		nullable: true,
		name: 'city'
	})
	public city: string | null;

	@Column('character varying', {
		nullable: true,
		name: 'state'
	})
	public state: string | null;

	@Column('character varying', {
		nullable: true,
		name: 'zipcode'
	})
	public zipcode: string | null;

	@Column('character varying', {
		nullable: true,
		name: 'country_code'
	})
	public countryCode: string | null;

	@Column('integer', {
		nullable: true,
		name: 'registration_id'
	})
	public registrationId: number | null;

	@Column('date',{
		nullable:true,
		name:'registration_date'
	})
	public registrationDate: Date | null;

	@Column('integer', {
		nullable: true,
		name: 'rsu_race_id'
	})
	public rsuRaceId: number | null;

	@Column('character varying', {
		nullable: true,
		name: 'race_name'
	})
	public raceName: string | null;

	@Column('integer', {
		nullable: true,
		name: 'event_id'
	})
	public eventId: number | null;

	@Column('character varying', {
		nullable: true,
		name: 'event_name'
	})
	public eventName: string | null;

	@Column('character varying', {
		nullable: true,
		name: 'event_start_time'
	})
	public eventStartTime: string | null;

	@Column('character varying', {
		array: true,
		nullable: true,
		name: 'addons'
	})
	public addons: string;

	@ManyToOne(() => RunSignupRace, (race) => race.participants)
	public race: RunSignupRace[];
}
