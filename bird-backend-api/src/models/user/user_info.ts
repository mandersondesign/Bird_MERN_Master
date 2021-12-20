import { Column, Entity, OneToOne, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import User from './user';
import ImportantGoal from '../event/important_goal';
import Event from '../event/event';

@Entity('user_info', { schema: 'user' })
export default class UserInfo {

	public static readonly EVENT_TYPE = {
		1: 'Race',
		2: 'Maintenance',
	};

	public static readonly LEVEL = {
		1: 'Beginner',
		2: 'Intermediate',
		3: 'Advanced',
	};

	public static readonly LONG_DISTANCE = {
		1: '0-5 Miles',
		2: '5-10 Miles',
		3: 'More than 10'
	};

	public static readonly MILES_PER_WEEK = {
		1: 'Less than 10',
		2: '10-20 Miles',
		3: 'More than 20'
	};

	public static readonly PAST_EXPERIENCE = {
		1: 'No',
		2: 'Once',
		3: 'More Than Once'
	};

	@PrimaryColumn('integer', {
		nullable: false,
		name: 'user_id'
	})
	public userId: number;

	@OneToOne(() => User, (user) => user.userId)
	@JoinColumn({ name: 'user_id' })
	public user: User;

	@Column('integer', {
		nullable: true,
		name: 'important_goal_id'
	})
	public importantGoalId: number;

	@ManyToOne(() => ImportantGoal, (goal) => goal.importantGoalId)
	@JoinColumn({ name: 'important_goal_id' })
	public importantGoal: ImportantGoal;

	@Column('integer', {
		nullable: true,
		name: 'long_race_id'
	})
	// 1 = 0..5, 2 = 5..10, 3 = 10+
	public longDistanceId: number;

	@Column('integer', {
		nullable: true,
		name: 'current_distance_per_week_id'
	})
	// 1 = 0..10, 2 = 10..20, 3 = 20+
	public milesPerWeekId: number;

	@Column('integer', {
		nullable: true,
		name: 'status_of_halt_marathon'
	})
	// 1 - no, 2 - once, 3 - many
	public pastExperienceId: number;

	@Column('timestamp without time zone',{
		nullable: true,
		name:'date_of_race'
	})
	public dateOfRace: Date;

	@Column('time without time zone', {
		nullable: true,
		name: 'goal_time'
	})
	public goalTime: string;

	@Column('integer', {
		nullable: true,
		name: 'goal_type'
	})
	public goalType: number;


	@Column('time without time zone', {
		nullable: true,
		name: 'current_5k_record'
	})
	public current5kRecord: string;

	@Column('time without time zone', {
		nullable: true,
		name: 'current_10k_record'
	})
	public current10kRecord: string;

	@Column('time without time zone', {
		nullable: true,
		name: 'current_half_marathon_record'
	})
	public currentHalfMarathonRecord: string;

	@Column('time without time zone', {
		nullable: true,
		name: 'current_marathon_record'
	})
	public currentMarathonRecord: string;

	@Column({
		type: 'jsonb',
		nullable: true,
		name: 'personal_records'
	})
	public personalRecords: any; // { id: string }[];

	@Column('integer', {
		nullable: true,
		array: true,
		name: 'days'
	})
	public days: number[];

	@Column('integer', {
		nullable: true,
		name: 'event_id'
	})
	public eventId: number;

	@ManyToOne(() => Event, (event) => event.eventId)
	@JoinColumn({ name: 'event_id' })
	public event: Event;

	@Column({
		default: false,
		name: 'is_completed',
	})
	public isCompleted: boolean;

	@Column('integer', {
		nullable: true,
		name: 'event_type_id'
	})
	// 1 - Race, 2 - Maintenance
	public eventTypeId: number;

	@Column('character varying', {
		nullable: true,
		name: 'race_name'
	})
	public raceName: string;

	@Column('integer', {
		nullable: true,
		name: 'level_id'
	})
	public levelId: number;

	@Column('character varying', {
		nullable: true,
		name: 'comment'
	})
	public comment: string;

	@Column({
		type: 'jsonb',
		nullable: true,
		name: 'custom_questions'
	})
	public customQuestions: { id: string }[];

}
