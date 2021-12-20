import {Column,Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import {IsEmail} from 'class-validator';
import PlanTemplate from '../plan/plan_template';

@Entity('order', { schema: 'squarespace' })
export default class SquarespaceOrder {

	@PrimaryGeneratedColumn({
		type: 'integer',
		name: 'order_id'
	})
	public orderId: number;

	@Column()
	@IsEmail()
	public email: string;

	@Column('integer',{
		nullable:true,
		name:'order_number'
	})
	public orderNumber: number | null;

	@Column({
		name: 'created_on',
		nullable:true,
	})
	public createdAt: Date;

	@Column('character varying', {
		nullable: false,
		name: 'first_name'
	})
	public firstName: string;

	@Column('character varying', {
		nullable: false,
		name: 'last_name'
	})
	public lastName: string;

	@Column('character varying', {
		nullable: true,
		name: 'product_name'
	})
	public productName: string;

	@ManyToOne(()=>PlanTemplate, (planTemplate: PlanTemplate)=>planTemplate.planTemplateId,{  nullable:true, })
	@JoinColumn({ name:'plan_template_id'})
	public planTemplate:PlanTemplate | null;

	@Column('integer',{
		nullable:true,
		name:'plan_template_id'
	})
	public planTemplateId:number | null;
}
