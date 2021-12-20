import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import User from './user';

@Entity('utm', { schema: 'user' })
export default class Utm {

	@PrimaryGeneratedColumn({
		type: 'integer',
		name: 'utm_id'
	})
	public utmId: number;

	@ManyToOne(() => User, (user) => user.userId)
	@JoinColumn({ name: 'user_id' })
	public user: User;

	@Column('integer', {
		nullable: false,
		name: 'user_id'
	})
	public userId: number;

	@Column('character varying', {
		nullable: true,
		name: 'utm_source'
	})
	public utmSource: string;

	@Column('character varying', {
		nullable: true,
		name: 'utm_medium'
	})
	public utmMedium: string;

	@Column('character varying', {
		nullable: true,
		name: 'utm_campaign'
	})
	public utmCampaign: string;

	@Column('character varying', {
		nullable: true,
		name: 'utm_term'
	})
	public utmTerm: string;

	@Column('character varying', {
		nullable: true,
		name: 'utm_content'
	})
	public utmContent: string;

}
