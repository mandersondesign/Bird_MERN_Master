import {Column,Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('event', { schema:'event' })
export default class Event {

	public static readonly HALF_MARATHON: number = 1;
	public static readonly MARATHON: number = 2; // eslint-disable-line
	public static readonly K10: number = 6; // eslint-disable-line

	@PrimaryGeneratedColumn({
		type: 'integer',
		name: 'event_id'
	})
	public eventId: number;

	@Column('character varying', {
		nullable: false,
		name: 'name'
	})
	public name: string;

	@Column({
		default: true,
		name: 'is_active',
	})
	public isActive: boolean;

	@Column('character varying', {
		nullable: true,
		name: 'image'
	})
	public image: string;

	@Column('character varying', {
		nullable: true,
		name: 'html'
	})
	public html: string;

	@Column('numeric',{
		nullable:true,
		precision:5,
		scale:3,
		name:'distance'
	})
	public distance:string;

	@Column({
		default: false,
		name: 'is_only_for_paid',
	})
	public isOnlyForPaid: boolean;

	@Column('integer', {
		nullable: true,
		name: 'position_in_list'
	})
	public positionInList: number;
}
