import { NextFunction, Response } from 'express';
import * as HttpStatusCodes from 'http-status-codes';
import WorkoutLibraryService from '../services/workoutLibraryService';
import WorkoutLibraryTransformer from '../transformers/workoutLibrary';
import IRequest from '../interfaces/IRequest';
import MetaTransformer from '../transformers/meta';
import { SortType } from '../shared/enums';
export default class WorkoutLibraryController {

	public async getById(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const workoutLibraryId = Number(req.params.id);

			const workoutLibrary = await WorkoutLibraryService.getById(currentUser, workoutLibraryId);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				data: WorkoutLibraryTransformer.transform(workoutLibrary)
			});
		}
		catch (error) {
			return next(error);
		}
	}


	public async deleteById(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const workoutLibraryId = Number(req.params.id);

			await WorkoutLibraryService.deleteById(currentUser, workoutLibraryId);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async updateById(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const workoutLibraryId = Number(req.params.id);
			const name = req.body.name;
			const description = req.body.description;
			const distance = req.body.distance;
			const time = req.body.time;
			const paceId = req.body.pace_id && !isNaN(Number(req.body.pace_id)) ? Number(req.body.pace_id) : null;
			const workoutTypeId = req.body.workout_type_id;
			const workoutTypeName = req.body.workout_type_name;

			await WorkoutLibraryService.updateById(currentUser, {
				workoutLibraryId,
				name,
				description,
				distance,
				time,
				paceId,
				workoutTypeId,
				workoutTypeName,
			});

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async add(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const name = req.body.name;
			const description = req.body.description;
			const distance = req.body.distance;
			const time = req.body.time;
			const workoutTypeId = req.body.workout_type_id;
			const workoutTypeName = req.body.workout_type_name;
			const paceId = req.body.pace_id && !isNaN(Number(req.body.pace_id)) ? Number(req.body.pace_id) : null;

			const workoutLibrary = await WorkoutLibraryService.add(currentUser, {
				name,
				workoutTypeId,
				workoutTypeName,
				description,
				distance,
				time,
				paceId,
			});

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				workout: WorkoutLibraryTransformer.transform(workoutLibrary),
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async list(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const limit = req.query.limit && !isNaN(Number(req.query.limit)) ? Number(req.query.limit) : 50; // eslint-disable-line
			const page = req.query.page && !isNaN(Number(req.query.page)) ? Number(req.query.page) : 1;
			const search = req.query.search as string;
			const sortField = req.query.sort as string;
			const sortType = req.query.sort_type as SortType;
			const workoutTypeId = req.query.workout_type_id ? Number(req.query.workout_type_id) : null;

			const { workouts, meta } = await WorkoutLibraryService.list(currentUser, limit, page, sortField, sortType, search, workoutTypeId);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				meta: MetaTransformer.transform(meta),
				workouts: (workouts || []).map((w) => WorkoutLibraryTransformer.transform(w)),
			});
		}
		catch (error) {
			return next(error);
		}
	}

}
