import {Column,Entity,JoinColumn,ManyToOne,PrimaryGeneratedColumn} from 'typeorm';
import User from '../user/user';

@Entity('user_to_stripe', {schema:'subscription'})
export default class UserToStripe {

	@PrimaryGeneratedColumn({
		type:'integer',
		name:'user_to_stripe_id'
	})
	public userToStripeId:number;

	@ManyToOne(()=>User, (user)=>user.userId,{  })
	@JoinColumn({ name:'user_id'})
	public user: User;

	@Column('integer', {
		nullable: false,
		name: 'user_id'
	})
	public userId: number;

	@Column('character varying', {
		nullable: true,
		name: 'stripe_customer_id'
	})
	public stripeCustomerId: string;
}
