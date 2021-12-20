import {EntityRepository, Repository} from 'typeorm';
import WorkoutLibrary from '../../models/plan/workout_library';

@EntityRepository(WorkoutLibrary)
export default class WorkoutLibraryRepository extends Repository<WorkoutLibrary> {

	public list(coachId: number, limit = 50, currentPage = 1, sortField = 'name', sortType : 'ASC' | 'DESC' = 'DESC', search?: string, workoutTypeId?: number,): Promise<WorkoutLibrary[]> { // eslint-disable-line

		const query = this.createQueryBuilder('workout_library')
			.leftJoinAndSelect('workout_library.workoutType', 'workoutType')
			.leftJoinAndSelect('workout_library.pace', 'pace')
			.where(`workout_library.coachId = ${coachId}`);

		if (search) {
			query
				.andWhere('workout_library.name ILIKE :search', { search: `%${search}%` });
		}

		if (workoutTypeId) {
			query
				.andWhere(
					`(workout_library.workoutTypeId = ${workoutTypeId})`
				);
		}

		if (sortField === 'name') {
			query.orderBy({
				'workout_library.name': sortType,
			});
		} else if (sortField === 'last_update') {
			query.orderBy({
				'workout_library.lastUpdate': {
					order: sortType,
					nulls: 'NULLS LAST'
				},
			});
		}

		query
			.take(limit)
			.skip((currentPage - 1) * limit);

		return query.getMany();
	}

	public countByUserId(coachId: number, search?: string): Promise<number> {
		if (!search) {
			return this.count({
				where: {
					coachId
				},
			});
		}

		return this.createQueryBuilder('workout_library')
			.where(`workout_library.coachId = ${coachId}`)
			.andWhere('workout_library.name ILIKE :search', { search: `%${search}%` })
			.getCount();
	}

	public add(coachId: number, {
		name,
		workoutTypeId,
		description,
		distance,
		time,
		paceId,
	}) : Promise<WorkoutLibrary>{
		return this.save({
			coachId,
			name,
			workoutTypeId,
			description: description || '',
			distance,
			time,
			paceId,
			lastUpdate: new Date(),
		});
	}

	public findById(workoutLibraryId: number): Promise<WorkoutLibrary> {
		return this.findOne({
			where: { workoutLibraryId },
			relations: ['workoutType', 'pace'],
		});
	}

	public updateById(workoutLibraryId: number, {
		name,
		description,
		distance,
		time,
		paceId,
		workoutTypeId
	}){
		return this.update(workoutLibraryId, {
			name,
			description: description || '',
			distance,
			time,
			paceId,
			workoutTypeId,
			lastUpdate: new Date(),
		});
	}

	public deleteById(workoutLibraryId: number) {
		return this.delete(workoutLibraryId);
	}

	public async findByName(name: string, coachId: number): Promise<WorkoutLibrary> {
		if (!name) {
			return null;
		}

		const sql = `SELECT workout_library_id
					FROM "plan"."workout_library"
					WHERE lower(name) = $1 and coach_id=$2`;

		const data = await this.query(sql, [name.toLowerCase().trim(), coachId]);

		if (!data.length) {
			return null;
		}

		return this.findOne(data[0].workout_library_id);
	}


}
