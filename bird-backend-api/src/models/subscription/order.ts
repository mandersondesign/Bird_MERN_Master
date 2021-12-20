import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import User from '../user/user';
import Program from '../plan/program';

@Entity('order', { schema: 'subscription' })
export default class Order {

	@PrimaryGeneratedColumn({
		type: 'integer',
		name: 'order_id'
	})
	public orderId: number;

	@ManyToOne(() => User, (user) => user.userId)
	@JoinColumn({ name: 'user_id' })
	public user: User;

	@Column('integer', {
		nullable: false,
		name: 'user_id'
	})
	public userId: number;

	@ManyToOne(()=>Program, (p: Program)=>p.programId,{  nullable: false, })
	@JoinColumn({ name:'program_id'})
	public program:Program;

	@Column('integer',{
		nullable:false,
		name:'program_id'
	})
	public programId:number;

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

	@Column('text', {
		nullable: true,
		name: 'apple_transaction_id'
	})
	public appleTransactionId: string;

	@Column('json', {
		nullable: true,
		name: 'apple_transaction_payload'
	})
	public appleTransactionPayload: any;

}
