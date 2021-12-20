import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_type', { schema: 'user' })
export default class UserType {

	public static readonly ADMIN: number = 1;
	public static readonly COACH: number = 2; // eslint-disable-line
	public static readonly ATHLETE: number = 3; // eslint-disable-line

	@PrimaryGeneratedColumn({
		type: 'integer',
		name: 'user_type_id'
	})
	public userTypeId: number;

	@Column('character varying', {
		nullable: false,
		name: 'name'
	})
	public name: string;
}
