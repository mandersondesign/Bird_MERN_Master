import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import User from './user';

@Entity('note', { schema: 'user' })
export default class Note {

	@PrimaryGeneratedColumn({
		type: 'integer',
		name: 'note_id'
	})
	public noteId: number;

	@ManyToOne(() => User, (user) => user.userId)
	@JoinColumn({ name: 'coach_id' })
	public coach: User;

	@Column('integer', {
		nullable: false,
		name: 'coach_id'
	})
	public coachId: number;

	@ManyToOne(() => User, (user) => user.userId)
	@JoinColumn({ name: 'athlete_id' })
	public athlete: User;

	@Column('integer', {
		nullable: false,
		name: 'athlete_id'
	})
	public athleteId: number;

	@Column('character varying', {
		nullable: true,
		name: 'text'
	})
	public text: string;

}
