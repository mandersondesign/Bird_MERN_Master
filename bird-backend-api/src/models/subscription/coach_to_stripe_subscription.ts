import {Column,Entity,JoinColumn,ManyToOne,PrimaryGeneratedColumn} from 'typeorm';
import CoachPlanToUser from './coach_plan_to_user';
import User from '../user/user';

@Entity('user_to_stripe_subscription', {schema:'subscription'})
export default class CoachToStripeSubscription {

	@PrimaryGeneratedColumn({
		type:'integer',
		name:'coach_to_stripe_subscription_id'
	})
	public coachToStripeSubscriptionId:number;

	@ManyToOne(()=>User, (user)=>user.userId,{  })
	@JoinColumn({ name:'user_id'})
	public user: User;

	@Column('integer', {
		nullable: false,
		name: 'user_id'
	})
	public userId: number;

	@ManyToOne(()=>CoachPlanToUser, (plan)=>plan.coachPlanToUserId,{  })
	@JoinColumn({ name:'coach_plan_to_user_id'})
	public coachPlanToUser: CoachPlanToUser;

	@Column('integer', {
		nullable: false,
		name: 'coach_plan_to_user_id'
	})
	public coachPlanToUserId: number;

	@Column('character varying', {
		nullable: true,
		name: 'stripe_subscription_id'
	})
	public stripeSubscriptionId: string | null;

	@Column('timestamp without time zone', {
		nullable: true,
		name: 'subscription_end'
	})
	public subscriptionEnd: Date;

	@Column({
		default: true
	})
	public isActive: boolean;
}
