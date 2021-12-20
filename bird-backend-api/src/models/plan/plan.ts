import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import PlanTemplate from './plan_template';
import PlanWeek from './plan_week';
import User from '../user/user';
import Event from '../event/event';

@Entity('plan', { schema: 'plan' })
export default class Plan {

	@PrimaryGeneratedColumn({
		type: 'integer',
		name: 'plan_id'
	})
	public planId: number;

	@ManyToOne(() => PlanTemplate, (planTemplate: PlanTemplate) => planTemplate.plans, { nullable: false, })
	@JoinColumn({ name: 'plan_template_id' })
	public planTemplate: PlanTemplate | null;

	@Column('integer', {
		nullable: false,
		name: 'plan_template_id'
	})
	public planTemplateId: number | null;

	@Column('character varying', {
		nullable: false,
		name: 'name'
	})
	public name: string;

	@Column('integer', {
		nullable: true,
		name: 'event_id'
	})
	public eventId: number;

	@ManyToOne(() => Event, (event) => event.eventId)
	@JoinColumn({ name: 'event_id' })
	public event: Event;

	@Column('boolean', {
		nullable: false,
		default: () => 'true',
		name: 'is_active'
	})
	public isActive: boolean;

	@Column('integer', {
		nullable: false,
		name: 'coach_id'
	})
	public coachId: number;

	@ManyToOne(() => User, (user) => user.userId)
	@JoinColumn({ name: 'coach_id' })
	public coach: User;

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

	@OneToMany(() => PlanWeek, (planWeek: PlanWeek) => planWeek.plan)
	public planWeeks: PlanWeek[];

	// @Column('integer',{
	// 	nullable:true,
	// 	name:'current_week'
	// })
	// public currentWeek:number | null; // TODO: remove

	@Column('boolean', {
		nullable: false,
		default: () => 'false',
		name: 'has_pain'
	})
	public hasPain: boolean;

	// @Column('date',{
	// 	nullable:true,
	// 	default: () => 'now()',
	// 	name:'publish_date'
	// })
	// public publishDate: Date; // TODO: remove

	@Column('numeric', {
		nullable: true,
		precision: 5,
		scale: 3,
		name: 'min'
	})
	public min: number | null;

	@Column('numeric', {
		nullable: true,
		precision: 5,
		scale: 3,
		name: 'max'
	})
	public max: number | null;

	@Column('date', {
		nullable: true,
		name: 'start_date'
	})
	public startDate: Date;

	@Column('character varying', {
		nullable: true,
		name: 'scheduled_message'
	})
	public scheduledMessage: string;

	@Column('timestamp with time zone', {
		nullable: true,
		name: 'message_date'
	})
	public messageDate: Date;

	@Column('boolean', {
		nullable: false,
		default: () => 'false',
		name: 'message_sent'
	})
	public messageSent: boolean;

}
