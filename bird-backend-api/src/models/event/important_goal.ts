import {Column,Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('important_goal', { schema:'event' })
export default class ImportantGoal {

	@PrimaryGeneratedColumn({
		type: 'integer',
		name: 'important_goal_id'
	})
	public importantGoalId: number;

	@Column('character varying', {
		nullable: false,
		name: 'name'
	})
	public name: string;

}
