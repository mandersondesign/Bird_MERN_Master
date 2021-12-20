import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import User from '../user/user';
import CoachPlan from './coach_plan';

@Entity('coach_plan_to_user', { schema: 'subscription' })
export default class CoachPlanToUser {

	@PrimaryGeneratedColumn({
		type: 'integer',
		name: 'coach_plan_to_user_id'
	})
	public coachPlanToUserId: number;

	@ManyToOne(() => User, (user) => user.userId)
	@JoinColumn({ name: 'coach_id' })
	public coach: User;

	@Column('integer', {
		nullable: false,
		name: 'coach_id'
	})
	public coachId: number;

	@ManyToOne(() => CoachPlan, (cp) => cp.coachPlanId)
	@JoinColumn({ name: 'coach_plan_id' })
	public coachPlan: CoachPlan;

	@Column('integer', {
		nullable: false,
		name: 'coach_plan_id'
	})
	public coachPlanId: number;

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
