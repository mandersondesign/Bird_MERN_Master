import {Column,Entity,JoinColumn,ManyToOne,PrimaryGeneratedColumn} from 'typeorm';
import User from '../user/user';

@Entity('athlete_plan' ,{ schema:'subscription' } )
export default class SubscriptionAthletePlan {

	@PrimaryGeneratedColumn({
		type:'integer',
		name:'athlete_plan_id'
	})
	public athletePlanId:number;

	@ManyToOne(() => User, (user) => user.userId)
	@JoinColumn({ name: 'coach_id' })
	public coach: User;

	@Column('integer', {
		nullable: false,
		name: 'coach_id'
	})
	public coachId: number;

	@Column('character varying',{
		nullable: true,
		name:'stripe_plan_id'
	})
	public stripePlanId:string;

	@Column('character varying',{
		nullable:false,
		name:'name'
	})
	public name:string;

	@Column('numeric',{
		nullable:true,
		precision:5,
		scale:2,
		name:'price'
	})
	public price:string;

}
