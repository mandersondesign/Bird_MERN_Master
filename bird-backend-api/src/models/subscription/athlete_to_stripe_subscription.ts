import {Column,Entity,JoinColumn,ManyToOne,PrimaryGeneratedColumn} from 'typeorm';
import AthletePlanToUser from './athlete_plan_to_user';
import User from '../user/user';

@Entity('athlete_to_stripe_subscription', {schema:'subscription'})
export default class AthleteToStripeSubscription {

	@PrimaryGeneratedColumn({
		type:'integer',
		name:'athlete_to_stripe_subscription_id'
	})
	public athleteToStripeSubscriptionId:number;

	@ManyToOne(()=>User, (user)=>user.userId,{  })
	@JoinColumn({ name:'user_id'})
	public user: User;

	@Column('integer', {
		nullable: false,
		name: 'user_id'
	})
	public userId: number;

	@ManyToOne(()=>AthletePlanToUser, (plan)=>plan.athletePlanToUserId,{  })
	@JoinColumn({ name:'athlete_plan_to_user_id'})
	public athletePlanToUser: AthletePlanToUser;

	@Column('integer', {
		nullable: false,
		name: 'athlete_plan_to_user_id'
	})
	public athletePlanToUserId: number;

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
