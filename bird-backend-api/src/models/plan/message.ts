import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Plan from './plan';
import User from '../user/user';
import Workout from './workout';

@Entity('message', { schema: 'plan' })
export default class Message {

	@PrimaryGeneratedColumn({
		type: 'integer',
		name: 'message_id'
	})
	public messageId: number;

	@ManyToOne(() => Plan, (plan: Plan) => plan.planId, { nullable: true, })
	@JoinColumn({ name: 'plan_id' })
	public plan: Plan;

	@Column('integer', {
		nullable: true,
		name: 'plan_id'
	})
	public planId: number;

	@ManyToOne(() => Workout, (workout: Workout) => workout.workoutId, { nullable: true, })
	@JoinColumn({ name: 'workout_id' })
	public workout: Workout;

	@Column('integer', {
		nullable: true,
		name: 'workout_id'
	})
	public workoutId: number;

	@ManyToOne(() => User, (user) => user.userId) @JoinColumn({ name: 'coach_id' })
	public coach: User;

	@Column('integer', {
		nullable: true,
		name: 'coach_id'
	})
	public coachId: number;

	@Column('integer', {
		nullable: false,
		name: 'athlete_id'
	})
	public athleteId: number;

	@ManyToOne(() => User, (user) => user.userId)
	@JoinColumn({
		name: 'athlete_id'
	})
	public athlete: User;

	@Column({
		name: 'date',
		default: () => 'now()',
	})
	public date: Date;

	@Column('character varying', {
		nullable: false,
		default: () => '\'\'',
		name: 'text'
	})
	public text: string;

	@Column({
		name: 'is_from_athlete',
		default: false,
	})
	public isFromAthlete: boolean;

	@Column('timestamp with time zone', {
		nullable: true,
		name: 'read_date'
	})
	public readDate: Date;

}
