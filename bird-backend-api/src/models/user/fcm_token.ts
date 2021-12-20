import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './user';
import Session from './session';

@Entity('fcm_token', { schema: 'user' })
export default class FCMToken {

	@PrimaryGeneratedColumn({
		name: 'fcm_token_id'
	})
	public fcmTokenId: number;

	@ManyToOne(() => User, (user) => user.userId)
	@JoinColumn({ name: 'user_id' })
	public user: User;

	@Column('integer', {
		nullable: false,
		name: 'user_id'
	})
	public userId: number;

	@ManyToOne(() => Session, (session) => session.sessionId)
	@JoinColumn({ name: 'session_id' })
	public session: Session;

	@Column('integer', {
		nullable: false,
		name: 'session_id'
	})
	public sessionId: number;

	@Column('character varying', {
		nullable: false,
		name: 'token'
	})
	public token: string;

}
