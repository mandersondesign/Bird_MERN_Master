import {Column,Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('waiver', { schema:'fleetfeet' })
export default class FletfeetWaiver{

	@PrimaryGeneratedColumn({
		type: 'integer',
		name: 'waiver_id'
	})
	public waiverId: number;

	@Column('integer',{
		nullable:false,
		default: 1,
		name:'event_type_id'
	})
	public eventTypeId:number;

	@Column('character varying', {
		nullable: false,
		name: 'text'
	})
	public text: string;
}
