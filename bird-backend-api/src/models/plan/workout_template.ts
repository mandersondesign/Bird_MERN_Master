import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import WorkoutType from './workout_type';
import PlanWeekTemplate from './plan_week_template';

@Entity('workout_template', { schema: 'plan' })
export default class WorkoutTemplate {

	@PrimaryGeneratedColumn({
		type: 'integer',
		name: 'workout_template_id'
	})
	public workoutTemplateId: number;

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

	@ManyToOne(() => WorkoutType, (workoutType: WorkoutType) => workoutType.workoutTemplates, { nullable: false, })
	@JoinColumn({ name: 'workout_type_id' })
	public workoutType: WorkoutType;

	@Column('integer', {
		nullable: false,
		name: 'workout_type_id'
	})
	public workoutTypeId: number;

	@Column('integer', {
		nullable: true,
		name: 'day_number'
	})
	public dayNumber: number | null;

	@Column('character varying', {
		nullable: false,
		default: () => '\'\'',
		name: 'description'
	})
	public description: string;

	@Column('integer', {
		nullable: true,
		name: 'pace_id'
	})
	public paceId: number | null;

	@Column('numeric', {
		nullable: true,
		precision: 5,
		scale: 3,
		name: 'distance'
	})
	public distance: number | null;

	@Column('integer', {
		nullable: true,
		name: 'time'
	})
	public time: number;

	@ManyToOne(() => PlanWeekTemplate, (planWeekTemplate: PlanWeekTemplate) => planWeekTemplate.workoutTemplates, { nullable: false, })
	@JoinColumn({ name: 'plan_week_template_id' })
	public planWeekTemplate: PlanWeekTemplate;

	@Column('integer', {
		nullable: false,
		name: 'plan_week_template_id'
	})
	public planWeekTemplateId: number;
}
