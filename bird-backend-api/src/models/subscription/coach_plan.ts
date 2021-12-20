import {Column,Entity,PrimaryGeneratedColumn} from 'typeorm';

@Entity('coach_plan' ,{ schema:'subscription' } )
export default class SubscriptionCoachPlan {

	public static readonly FREE: number = 1;
	public static readonly CORE: number = 2;
	public static readonly TEAM: number = 3;
	public static readonly ENTERPRISE: number = 4; // eslint-disable-line

	@PrimaryGeneratedColumn({
		type:'integer',
		name:'coach_plan_id'
	})
	public coachPlanId:number;

	@Column('character varying',{
		nullable:false,
		name:'name'
	})
	public name:string;

	@Column('character varying',{
		nullable:false,
		default: () => '\'\'',
		name:'description'
	})
	public description:string;

	@Column('simple-array', {
		nullable: true,
		array: true,
		name: 'options'
	})
	public options: string[];

	@Column('integer', {
		nullable: true,
		name: 'max_athletes'
	})
	public maxAthletes: number;

	@Column('integer', {
		nullable: true,
		name: 'max_templates'
	})
	public maxTemplates: number;

	@Column('integer', {
		nullable: true,
		name: 'trial_days'
	})
	public trialDays: number;

	@Column({
		name: 'is_active',
		default: true,
	})
	public isActive: boolean;

	@Column({
		name: 'is_public',
		default: true,
	})
	public isPublic: boolean;

	@Column('numeric',{
		nullable:true,
		precision:5,
		scale:2,
		name:'price'
	})
	public price:string;

	@Column('character varying',{
		nullable: true,
		name:'stripe_plan_id'
	})
	public stripePlanId:string;

}
