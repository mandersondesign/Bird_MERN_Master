import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, ManyToOne } from 'typeorm';
import User from './user';
import LastActivityType from './last_activity_type';
import Workout from '../plan/workout';

@Entity('last_activity', { schema: 'user' })
export default class LastActivity {

	@PrimaryColumn('integer', {
		nullable: false,
		name: 'user_id'
	})
	public userId: number;

	@OneToOne(() => User, (user) => user.userId)
	@JoinColumn({ name: 'user_id' })
	public user: User;

	@Column({
		name: 'date',
		default: () => 'now()',
	})
	public date: Date;

	@ManyToOne(() => LastActivityType, (type) => type.lastActivityTypeId)
	@JoinColumn({ name: 'last_activity_type_id' })
	public lastActivityType: LastActivityType;

	@Column('integer', {
		nullable: false,
		name: 'last_activity_type_id'
	})
	public lastActivityTypeId: number;

	@Column('character varying', {
		nullable: true,
		name: 'comment'
	})
	public comment: string;

	@Column('integer', {
		nullable: true,
		name: 'worktout_id'
	})
	public workoutId: number;

	@ManyToOne(() => Workout, (workout) => workout.workoutId)
	@JoinColumn({
		name: 'worktout_id'
	})
	public workout: Workout;
}
