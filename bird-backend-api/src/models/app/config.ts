import { Column, Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import User from '../user/user';

@Entity('config', { schema: 'app' })
export default class AppConfig {

	@PrimaryColumn('integer', {
		nullable: false,
		name: 'config_id'
	})
	public configId: number;

	@ManyToOne(() => User, (user) => user.userId)
	@JoinColumn({ name: 'default_coach_id' })
	public defaultCoach: User;

	@Column('integer', {
		nullable: true,
		name: 'default_coach_id'
	})
	public defaultCoachId: number;

}
