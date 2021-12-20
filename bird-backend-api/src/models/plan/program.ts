import {Column,Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import PlanTemplate from './plan_template';

@Entity('program', { schema:'plan' })
export default class Program {

	@PrimaryGeneratedColumn({
		type: 'integer',
		name: 'program_id'
	})
	public programId: number;

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

	@Column('character varying',{
		nullable: true,
		name:'stripe_product_id'
	})
	public stripeProductId:string;

	@Column('date',{
		nullable:true,
		name:'start_date'
	})
	public startDate: Date;

	@Column('character varying', {
		nullable: false,
		name: 'image_url'
	})
	public image_url: string;

	@Column('character varying', {
		nullable: true,
		name: 'addon'
	})
	public addon: string;
}
