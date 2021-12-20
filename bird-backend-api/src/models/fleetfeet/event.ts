import {Column,Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import PlanTemplate from '../plan/plan_template';

@Entity('event', { schema:'fleetfeet' })
export default class FletfeetEvent {

	@PrimaryGeneratedColumn({
		type: 'integer',
		name: 'event_id'
	})
	public eventId: number;

	@Column('character varying', {
		nullable: false,
		name: 'name'
	})
	public name: string;

	@Column('character varying', {
		nullable: false,
		name: 'description'
	})
	public description: string;

	@Column('numeric',{
		nullable:true,
		precision:5,
		scale:2,
		name:'price'
	})
	public price:string;

	@Column({
		default: true,
		name: 'is_active',
	})
	public isActive: boolean;

	@Column('character varying', {
		nullable: true,
		name: 'alias'
	})
	public alias: string;

	@ManyToOne(()=>PlanTemplate, (planTemplate: PlanTemplate)=>planTemplate.plans,{  nullable:true, })
	@JoinColumn({ name:'plan_template_id'})
	public planTemplate:PlanTemplate | null;

	@Column('integer',{
		nullable:true,
		name:'plan_template_id'
	})
	public planTemplateId:number | null;

	@Column('integer',{
		nullable:true,
		name:'beginner_plan_template_id'
	})
	public beginnerPlanTemplateId:number | null;

	@Column('integer',{
		nullable:true,
		name:'advance_plan_template_id'
	})
	public advancePlanTemplateId:number | null;

	@Column('character varying',{
		nullable: true,
		name:'stripe_product_id'
	})
	public stripeProductId:string;

	@Column('integer',{
		nullable:false,
		default: 1,
		name:'event_type_id'
	})
	public eventTypeId:number;

	@Column('date',{
		nullable:true,
		name:'start_date'
	})
	public startDate: Date;
}
