import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import User from './user';
import FletfeetEvent from '../fleetfeet/event';

@Entity('invite', { schema: 'user' })
export default class Invite {

	@PrimaryGeneratedColumn({
		type: 'integer',
		name: 'invite_id'
	})
	public inviteId: number;

	@ManyToOne(() => User, (user) => user.userId)
	@JoinColumn({ name: 'coach_id' })
	public from: User;

	@Column('integer', {
		nullable: false,
		name: 'coach_id'
	})
	public fromId: number;

	@ManyToOne(() => User, (user) => user.userId)
	@JoinColumn({ name: 'athlete_id' })
	public to: User;

	@Column('integer', {
		nullable: false,
		name: 'athlete_id'
	})
	public toId: number;

	@Column({
		name: 'is_accepted',
		default: false,
	})
	public isAccepted: boolean;

	@Column({
		name: 'created_at',
		default: () => 'now()'
	})
	public createdAt: Date;

	@ManyToOne(()=>FletfeetEvent, (event: FletfeetEvent)=>event.eventId,{  nullable:true, })
	@JoinColumn({ name:'fletfeet_event_id'})
	public fletfeetEvent:FletfeetEvent | null;

	@Column('integer',{
		nullable:true,
		name:'fletfeet_event_id'
	})
	public fletfeetEventId:number | null;

}
