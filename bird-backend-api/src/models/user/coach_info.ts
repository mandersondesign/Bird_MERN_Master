import { Column, Entity, OneToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import User from './user';

@Entity('coach_info', { schema: 'user' })
export default class CoachInfo {

	public static readonly MEASUREMENT_ID_MILE: number = 1;
	public static readonly MEASUREMENT_ID_KM: number = 2; // eslint-disable-line

	@PrimaryColumn('integer', {
		nullable: false,
		name: 'user_id'
	})
	public userId: number;

	@OneToOne(() => User, (user) => user.userId)
	@JoinColumn({ name: 'user_id' })
	public user: User;

	@Column('character varying', {
		nullable: false,
		name: 'about'
	})
	public about: string;

	@Column('simple-array', {
		nullable: true,
		array: true,
		name: 'specialties'
	})
	public specialties: string[];

	@Column('simple-array', {
		nullable: true,
		array: true,
		name: 'images'
	})
	public images: string[];

	@Column('integer', {
		default: 1,
		name: 'onboarding_step'
	})
	public onboardingStep: number;

	@Column('integer', {
		default: 1,
		name: 'measurement_id'
	})
	public measurementId: number;

	@Column('simple-array', {
		nullable: true,
		array: true,
		name: 'custom_questions'
	})
	public customQuestions: string[];

}
