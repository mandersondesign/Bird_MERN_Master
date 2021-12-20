import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import User from '../user/user';
import FletfeetEvent from './event';

@Entity('pay_log', { schema: 'fleetfeet' })
export default class PayLog {

	@PrimaryGeneratedColumn({
		type: 'integer',
		name: 'pay_log_id'
	})
	public payLogId: number;

	@ManyToOne(() => User, (user) => user.userId)
	@JoinColumn({ name: 'user_id' })
	public user: User;

	@Column('integer', {
		nullable: false,
		name: 'user_id'
	})
	public userId: number;

	@ManyToOne(()=>FletfeetEvent, (event: FletfeetEvent)=>event.eventId,{  nullable: false, })
	@JoinColumn({ name:'event_id'})
	public fletfeetEvent:FletfeetEvent;

	@Column('integer',{
		nullable:false,
		name:'event_id'
	})
	public fletfeetEventId:number;

	@Column('integer', {
		nullable: false,
		name: 'amount'
	})
	public amount: number;

	@Column({
		name: 'date',
		default: () => 'now()',
	})
	public date: Date;

}
