import {Column,Entity,JoinColumn,ManyToOne,PrimaryGeneratedColumn} from 'typeorm';
import Plan from './plan';
import Pace from './pace';

@Entity('user_pace' ,{schema:'plan' } )
export default class UserPace {

	@PrimaryGeneratedColumn({
		type:'integer',
		name:'user_pace_id'
	})
	public userPaceId:number;

	@ManyToOne(()=>Plan, (plan: Plan)=>plan.planId,{  nullable:false, })
	@JoinColumn({ name:'plan_id'})
	public plan:Plan;

	@Column('integer',{
		nullable:false,
		name:'plan_id'
	})
	public planId:number;

	@ManyToOne(()=>Pace, (pace: Pace)=>pace.paceId,{  nullable:false, })
	@JoinColumn({ name:'pace_id'})
	public pace:Pace;

	@Column('integer',{
		nullable:false,
		name:'pace_id'
	})
	public paceId:number;

	@Column('character varying',{
		nullable:false,
		name:'value'
	})
	public value:string;

}
