import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import User from '../user/user';
import AthletePlan from './athlete_plan';

@Entity('athlete_plan_to_user', { schema: 'subscription' })
export default class AthletePlanToUser {

	@PrimaryGeneratedColumn({
		type: 'integer',
		name: 'athlete_plan_to_user_id'
	})
	public athletePlanToUserId: number;

	@ManyToOne(() => User, (user) => user.userId)
	@JoinColumn({ name: 'athlete_id' })
	public athlete: User;

	@Column('integer', {
		nullable: false,
		name: 'athlete_id'
	})
	public athleteId: number;

	@ManyToOne(() => AthletePlan, (cp) => cp.athletePlanId)
	@JoinColumn({ name: 'athlete_plan_id' })
	public athletePlan: AthletePlan;

	@Column('integer', {
		nullable: false,
		name: 'athlete_plan_id'
	})
	public athletePlanId: number;

	@Column({
		name: 'start_date',
		default: () => 'now()'
	})
	public startDate: Date;

	@Column({
		nullable: true,
		name: 'paid_to_date',
	})
	public paidToDate: Date;

	@Column('character varying', {
		nullable: true,
		name: 'error_message'
	})
	public errorMessage: string;

}
