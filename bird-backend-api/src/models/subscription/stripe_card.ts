import {Column,Entity,JoinColumn,ManyToOne,PrimaryGeneratedColumn} from 'typeorm';
import User from '../user/user';

@Entity('stripe_card', {schema:'subscription'})
export default class StripeCard {

	@PrimaryGeneratedColumn({
		type:'integer',
		name:'stripe_card_id'
	})
	public stripeCardId:number;

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
		name: 'stripe_source_id'
	})
	public stripeSourceId: string;

	@Column('character varying', {
		nullable: true,
		name: 'stripe_customer_id'
	})
	public stripeCustomerId: string;

	@Column('character varying', {
		nullable: true,
		name: 'brand'
	})
	public brand: string;

	@Column('character varying', {
		nullable: true,
		name: 'fingerprint'
	})
	public fingerprint: string;

	@Column('character varying', {
		nullable: true,
		name: 'funding'
	})
	public funding: string;

	@Column('integer', {
		nullable: true,
		name: 'exp_month'
	})
	public expMonth: number;

	@Column('integer', {
		nullable: true,
		name: 'exp_year'
	})
	public expYear: number;

	@Column('integer', {
		nullable: true,
		name: 'last4'
	})
	public last4: number;
}

