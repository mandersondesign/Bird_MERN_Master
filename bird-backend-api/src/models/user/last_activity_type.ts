import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('last_activity_type', { schema: 'user' })
export default class LastActivityType {

	public static readonly INVITATION_SEND: number = 1;
	public static readonly SIGNUP_COMPLETED: number = 2; // eslint-disable-line
	public static readonly ONBOARDING_COMPLETED: number = 3; // eslint-disable-line
	public static readonly PLAN_ASSIGNED: number = 4; // eslint-disable-line
	public static readonly WORKOUT_COMPLETED: number = 5; // eslint-disable-line
	public static readonly PLAN_ENDED: number = 6; // eslint-disable-line

	@PrimaryGeneratedColumn({
		type: 'integer',
		name: 'last_activity_type_id'
	})
	public lastActivityTypeId: number;

	@Column('character varying', {
		nullable: false,
		name: 'name'
	})
	public name: string;
}
