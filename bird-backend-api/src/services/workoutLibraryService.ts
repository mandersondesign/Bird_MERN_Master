import * as HttpStatusCodes from 'http-status-codes';
import WorkoutLibraryRepository from '../repository/plan/workoutLibraryRepository';
import { getConnection } from 'typeorm';
import WorkoutLibrary from '../models/plan/workout_library';
import User from '../models/user/user';
import ApplicationError from '../errors/applicationError';
import WorkoutTypeRepository from '../repository/plan/workoutTypeRepository';
import UserType from '../models/user/user_type';
import CoachInfoRepository from '../repository/user/coachInfoRepository';
import CoachInfo from '../models/user/coach_info';

const MAX_DISTANCE = 100;
const MAX_LIMIT = 1000;

export default class WorkoutLibraryService {

	public static async add (currentUser: User, {
		name,
		workoutTypeId,
		workoutTypeName,
		description,
		distance,
		time,
		paceId,
	}) {
		const workoutLibraryRepository : WorkoutLibraryRepository = getConnection().getCustomRepository(WorkoutLibraryRepository);
		const workoutTypeRepository: WorkoutTypeRepository = getConnection().getCustomRepository(WorkoutTypeRepository);

		if (!time && !isFinite(distance)) {
			throw new ApplicationError('Distance or time is required');
		}

		if (time && isFinite(distance)) {
			throw new ApplicationError('Please, chose distance or time');
		}

		if (distance && isNaN(Number(distance))) {
			throw new ApplicationError('Distance should be a numeric');
		}

		if (distance && Number(distance) >= MAX_DISTANCE) {
			throw new ApplicationError(`Distance should be less than ${MAX_DISTANCE} miles`);
		}

		if (time) {
			time = (Number(time.split(':')[0]) * 60 + Number(time.split(':')[1]))*60; // eslint-disable-line
		}

		if (!name) {
			throw new ApplicationError('Workout name is required');
		}

		const wL = await workoutLibraryRepository.findByName(name, currentUser.userId);
		if (wL) {
			throw new ApplicationError('Workout with this name already exists');
		}

		if (!workoutTypeName && !workoutTypeId) {
			throw new ApplicationError('Workout type is required');
		}

		if (workoutTypeName) {
			// BIRD-1155 Create a new workout type

			if (currentUser.userTypeId !== UserType.COACH) {
				throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
			}

			let workoutType = await workoutTypeRepository.findBySystemName(workoutTypeName);
			if (workoutType) {
				throw new ApplicationError('This type is reserved for system workout types');
			}

			workoutType = await workoutTypeRepository.findByName(workoutTypeName, currentUser.userId);
			if (workoutType) {
				throw new ApplicationError('Workout of this type already exists');
			}

			workoutType = await workoutTypeRepository.add({
				name: workoutTypeName,
				coachId: currentUser.userId
			});

			workoutTypeId = workoutType.workoutTypeId;
		}

		const workout = await workoutLibraryRepository.add(currentUser.userId, {
			name,
			workoutTypeId,
			description,
			distance,
			time,
			paceId,
		});

		return workout;
	}

	public static async getById (currentUser: User, workoutLibraryId: number) {
		const workoutLibraryRepository : WorkoutLibraryRepository = getConnection().getCustomRepository(WorkoutLibraryRepository);

		if (isNaN(Number(workoutLibraryId))) {
			throw new ApplicationError('Wrong workout library id');
		}

		const workout : WorkoutLibrary = await workoutLibraryRepository.findById(workoutLibraryId);

		if (!workout) {
			throw new ApplicationError('Workout not found', HttpStatusCodes.NOT_FOUND);
		}

		if (workout.coachId !== currentUser.userId) {
			throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
		}

		const coachInfoRepository: CoachInfoRepository = getConnection().getCustomRepository(CoachInfoRepository);
		const coachInfo = await coachInfoRepository.findById(currentUser.userId);

		if (workout.pace && coachInfo && coachInfo.measurementId === CoachInfo.MEASUREMENT_ID_KM) {
			workout.pace.name = (workout.pace.name || '').replace('Mile', 'Kilometer');
			workout.pace.description = (workout.pace.description || '').replace('Mile', 'Kilometer').replace('mile', 'kilometer');
		}

		return workout;
	}

	public static async deleteById (currentUser: User, workoutLibraryId: number) {
		return getConnection().transaction(async (entityManager) => {
			const workoutLibraryRepository : WorkoutLibraryRepository = entityManager.getCustomRepository(WorkoutLibraryRepository);

			if (isNaN(Number(workoutLibraryId))) {
				throw new ApplicationError('Wrong workout library id');
			}

			const workout : WorkoutLibrary = await workoutLibraryRepository.findById(workoutLibraryId);

			if (!workout) {
				throw new ApplicationError('Workout not found', HttpStatusCodes.NOT_FOUND);
			}

			if (workout.coachId !== currentUser.userId) {
				throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
			}

			await workoutLibraryRepository.delete(workoutLibraryId);

			return workout;
		});
	}

	public static async updateById (currentUser: User, {
		workoutLibraryId,
		name,
		description,
		distance,
		time,
		paceId,
		workoutTypeId,
		workoutTypeName
	}) {
		const workoutLibraryRepository : WorkoutLibraryRepository = getConnection().getCustomRepository(WorkoutLibraryRepository);
		const workoutTypeRepository: WorkoutTypeRepository = getConnection().getCustomRepository(WorkoutTypeRepository);

		if (isNaN(Number(workoutLibraryId))) {
			throw new ApplicationError('Wrong workout library id');
		}

		const workout : WorkoutLibrary = await workoutLibraryRepository.findById(workoutLibraryId);

		if (!workout) {
			throw new ApplicationError('Workout not found', HttpStatusCodes.NOT_FOUND);
		}

		if (workout.coachId !== currentUser.userId) {
			throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
		}

		if (!time && !isFinite(distance)) {
			throw new ApplicationError('Distance or time is required');
		}

		if (time && isFinite(distance)) {
			throw new ApplicationError('Please, chose distance or time');
		}

		if (distance && isNaN(Number(distance))) {
			throw new ApplicationError('Distance should be a numeric');
		}

		if (distance && Number(distance) >= MAX_DISTANCE) {
			throw new ApplicationError(`Distance should be less than ${MAX_DISTANCE} miles`);
		}

		if (time) {
			time = (Number(time.split(':')[0]) * 60 + Number(time.split(':')[1]))*60; // eslint-disable-line
		}

		if (!name) {
			throw new ApplicationError('Workout name is required');
		}

		if (!workoutTypeName && !workoutTypeId) {
			throw new ApplicationError('Workout type is required');
		}

		const wL = await workoutLibraryRepository.findByName(name, currentUser.userId);
		if (wL && wL.workoutLibraryId !== workout.workoutLibraryId) {
			throw new ApplicationError('Workout with this name already exists');
		}

		if (workoutTypeName) {
			// BIRD-1155 Create a new workout type
			if (currentUser.userTypeId !== UserType.COACH) {
				throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
			}

			let workoutType = await workoutTypeRepository.findBySystemName(workoutTypeName);
			if (workoutType) {
				throw new ApplicationError('This type is reserved for system workout types');
			}

			workoutType = await workoutTypeRepository.findByName(workoutTypeName, currentUser.userId);
			if (workoutType) {
				throw new ApplicationError('Workout of this type already exists');
			}

			workoutType = await workoutTypeRepository.add({
				name: workoutTypeName,
				coachId: currentUser.userId
			});

			workoutTypeId = workoutType.workoutTypeId;
		}

		await workoutLibraryRepository.updateById(workoutLibraryId, {
			name,
			description,
			distance,
			time,
			paceId,
			workoutTypeId
		});

		return workout;
	}

	public static async list(currentUser: User, limit = 50, page = 1, sortField: string, sortType : 'ASC' | 'DESC' = 'DESC', search?: string, workoutTypeId?: number) : Promise<any> { // eslint-disable-line 
		const workoutLibraryRepository : WorkoutLibraryRepository = getConnection().getCustomRepository(WorkoutLibraryRepository);

		const totalCount = await workoutLibraryRepository.countByUserId(currentUser.userId, search);

		if (limit < 1) {
			throw new ApplicationError('Limit should be more 1');
		}

		if (page < 1) {
			throw new ApplicationError('Page should be more 1');
		}

		const maxPage = Math.ceil(totalCount / limit) || 1;
		const currentPage = Math.max(Math.min(maxPage, page), 1);

		if (limit > MAX_LIMIT) {
			throw new ApplicationError(`Max limit ${MAX_LIMIT}`);
		}

		if (workoutTypeId && isNaN(workoutTypeId)) {
			throw new ApplicationError('Wrong workout number');
		}

		let workouts : WorkoutLibrary[] = await workoutLibraryRepository.list(currentUser.userId, limit, page, sortField, sortType, search, workoutTypeId);

		const coachInfoRepository: CoachInfoRepository = getConnection().getCustomRepository(CoachInfoRepository);
		const coachInfo = await coachInfoRepository.findById(currentUser.userId);

		if (coachInfo && coachInfo.measurementId === CoachInfo.MEASUREMENT_ID_KM) {
			workouts = workouts.map((w) => {
				if (w.pace) {
					w.pace.name = (w.pace.name || '').replace('Mile', 'Kilometer');
					w.pace.description = (w.pace.description || '').replace('Mile', 'Kilometer').replace('mile', 'kilometer');
				}
				return w;
			});
		}

		return {
			meta: {
				totalCount,
				limit,
				page: currentPage,
				maxPage,
				name: '',
			},
			workouts
		};
	}

	public static async count(userId: number) : Promise<number>{
		const workoutLibraryRepository : WorkoutLibraryRepository = getConnection().getCustomRepository(WorkoutLibraryRepository);

		return workoutLibraryRepository.countByUserId(userId);
	}

}
