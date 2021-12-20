import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './user';

@Entity('session', { schema: 'user' })
export default class Session {

	@PrimaryGeneratedColumn({
		name: 'session_id'
	})
	public sessionId: number;

	@ManyToOne(() => User, (user) => user.userId)
	@JoinColumn({ name: 'user_id' })
	public user: User;

	@Column('integer', {
		nullable: false,
		name: 'user_id'
	})
	public userId: number;

	@Column({
		name: 'is_active',
		default: true,
	})
	public isActive: boolean;

	@Column({
		name: 'created_at',
		default: () => 'now()'
	})
	public createdAt: Date;

	@Column({
		name: 'last_user_time',
		default: () => 'now()',
	})
	public lastUserTime: Date;

	@Column({
		type: 'inet',
		nullable: true,
		name: 'last_user_ip',
	})
	public lastUserIp: string;
}
