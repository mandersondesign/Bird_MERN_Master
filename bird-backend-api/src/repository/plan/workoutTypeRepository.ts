import {EntityRepository, Repository} from 'typeorm';
import WorkoutType from '../../models/plan/workout_type';

@EntityRepository(WorkoutType)
export default class WorkoutTypeRepository extends Repository<WorkoutType> {

	public async list(coachId) : Promise<WorkoutType[]>{
		const query = this.createQueryBuilder('workout_type')
			.where(`workout_type.coachId = ${coachId} or workout_type.coachId is null`);

		query.orderBy({
			'workout_type.coachId': {
				order: 'ASC',
				nulls: 'NULLS FIRST'
			},
			'workout_type.name': 'ASC',
		});

		return query.getMany();
	}

	public async add({
		name,
		coachId,
	}) : Promise<WorkoutType>{
		return this.save({
			name,
			coachId,
		});
	}

	public async findBySystemName(name: string): Promise<WorkoutType> {
		if (!name) {
			return null;
		}

		const sql = `SELECT workout_type_id
					FROM "plan"."workout_type"
					WHERE lower(name) = $1 and coach_id is null`;

		const data = await this.query(sql, [name.toLowerCase().trim()]);

		if (!data.length) {
			return null;
		}

		return this.findOne(data[0].workout_type_id);
	}

	public async findByName(name: string, coachId: number): Promise<WorkoutType> {
		if (!name) {
			return null;
		}

		const sql = `SELECT workout_type_id
					FROM "plan"."workout_type"
					WHERE lower(name) = $1 and coach_id=$2`;

		const data = await this.query(sql, [name.toLowerCase().trim(), coachId]);

		if (!data.length) {
			return null;
		}

		return this.findOne(data[0].workout_type_id);
	}

}
