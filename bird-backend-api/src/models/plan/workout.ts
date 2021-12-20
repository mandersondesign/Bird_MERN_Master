import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import PlanWeek from './plan_week';
import WorkoutType from './workout_type';
import WorkoutStatus from './workout_status';
import Pace from './pace';
import Message from './message';


@Entity('workout', { schema: 'plan' })
export default class Workout {

	@PrimaryGeneratedColumn({
		type: 'integer',
		name: 'worktout_id' // TODO: rename
	})
	public workoutId: number;

	@Column('integer', {
		nullable: true,
		name: 'workout_template_id'
	})
	public workoutTemplateId: number;

	@ManyToOne(() => PlanWeek, (planWeek: PlanWeek) => planWeek.workouts, { nullable: false, })
	@JoinColumn({ name: 'plan_week_id' })
	public planWeek: PlanWeek;

	@Column('integer', {
		nullable: false,
		name: 'plan_week_id'
	})
	public planWeekId: number;

	@Column('character varying', {
		nullable: true,
		name: 'name'
	})
	public name: string;

	@Column('character varying', {
		nullable: true,
		name: 'scheduled_message'
	})
	public scheduledMessage: string;

	@ManyToOne(() => WorkoutType, (workoutType: WorkoutType) => workoutType.workouts, { nullable: false, })
	@JoinColumn({ name: 'workout_type_id' })
	public workoutType: WorkoutType;

	@Column('integer', {
		nullable: false,
		name: 'workout_type_id'
	})
	public workoutTypeId: number;

	@Column('character varying', {
		nullable: false,
		default: () => '\'\'',
		name: 'description'
	})
	public description: string;

	@Column('numeric', {
		nullable: true,
		precision: 5,
		scale: 3,
		name: 'distance'
	})
	public distance: number;

	@Column('integer', {
		nullable: true,
		name: 'time'
	})
	public time: number;

	@ManyToOne(() => Pace, (pace: Pace) => pace.workouts, { nullable: true, })
	@JoinColumn({ name: 'pace_id' })
	public pace: Pace;

	@Column('integer', {
		nullable: true,
		name: 'pace_id'
	})
	public paceId: number;

	@Column('date', {
		nullable: false,
		name: 'date'
	})
	public date: string;

	@ManyToOne(() => WorkoutStatus, (sorkoutStatus: WorkoutStatus) => sorkoutStatus.workoutStatusId, { nullable: false, })
	@JoinColumn({ name: 'workout_status_id' })
	public workoutStatus: WorkoutStatus;

	@Column('integer', {
		nullable: false,
		default: WorkoutStatus.NO_RESULTS,
		name: 'workout_status_id'
	})
	public workoutStatusId: number;

	@OneToOne(() => Message, (message: Message) => message.workout)
	public message: Message;

	@Column('boolean', {
		nullable: false,
		default: () => 'false',
		name: 'is_marked_as_key'
	})
	public isMarkedAsKey: boolean;

	@Column('numeric', {
		nullable: true,
		precision: 5,
		scale: 3,
		name: 'completed_distance'
	})
	public completedDistance: number;

	@Column('numeric', {
		nullable: true,
		name: 'avg_pace'
	})
	public avgPace: number;

	@Column('boolean', {
		nullable: false,
		default: () => 'false',
		name: 'is_liked'
	})
	public isLiked: boolean;

	@Column('bigint', {
		nullable: true,
		name: 'moving_time'
	})
	public movingTime: number;

	@Column('bigint', {
		nullable: true,
		name: 'elapsed_time'
	})
	public elapsedTime: number;

	@Column('boolean', {
		nullable: false,
		default: () => 'false',
		name: 'has_result'
	})
	public hasResult: boolean;

	@Column('bigint', {
		nullable: true,
		name: 'strava_activity_id'
	})
	public activityId: string;

	@Column('integer', {
		nullable: false,
		default: 0,
		name: 'strava_activities_count'
	})
	public stravaActivitiesCount: number;
}
