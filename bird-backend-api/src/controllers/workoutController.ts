import { NextFunction, Response } from 'express';
import * as HttpStatusCodes from 'http-status-codes';
import WorkoutService from '../services/workoutService';
import WorkoutTransformer from '../transformers/workout';
import WorkoutTypeTransformer from '../transformers/workout_type';
import IRequest from '../interfaces/IRequest';
import MessageTransformer from '../transformers/message';
import PlanService from '../services/planService';

export default class WorkoutController {

	public async getById(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const workoutId = Number(req.params.id);

			const workout = await WorkoutService.getById(currentUser, workoutId);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				data: WorkoutTransformer.transform(workout)
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async changeStatus(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const workoutId = Number(req.params.id);
			const statusId = Number(req.body.status_id);

			await WorkoutService.changeStatus(currentUser, workoutId, statusId);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async updateResults(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const workoutId = Number(req.params.id);

			await WorkoutService.updateResults(currentUser, workoutId, {
				distance: req.body.distance,
				pace: req.body.pace,
				time: req.body.time,
			});

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async updateAthleteNotes(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const workoutId = Number(req.params.id);
			const text = req.body.text;

			await WorkoutService.updateAthleteNotes(currentUser, workoutId, text);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async getAthleteNotes(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const workoutId = Number(req.params.id);

			const messages = await WorkoutService.getAthleteNotes(currentUser, workoutId);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				messages: messages.map((m) => MessageTransformer.transform(m)),
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async deleteById(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const workoutId = Number(req.params.id);

			await WorkoutService.deleteById(currentUser, workoutId);

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
			const workoutId = Number(req.params.id);
			const name = req.body.name;
			const description = req.body.description;
			const distance = req.body.distance;
			const time = req.body.time;
			const paceId = req.body.pace_id;
			const workoutTypeId = req.body.workout_type_id;
			const workoutTypeName = req.body.workout_type_name;
			const scheduledMessage = req.body.scheduled_message;

			await WorkoutService.updateById(currentUser, {
				workoutId,
				name,
				description,
				distance,
				time,
				paceId,
				workoutTypeId,
				workoutTypeName,
				scheduledMessage
			});

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async create(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const planId = req.body.plan_id;
			const name = req.body.name;
			const description = req.body.description;
			const distance = req.body.distance;
			const time = req.body.time;
			const workoutTypeId = req.body.workout_type_id;
			const workoutTypeName = req.body.workout_type_name;
			const paceId = req.body.pace_id;
			const shortDate = req.body.date;
			const scheduledMessage = req.body.scheduled_message;

			const workout = await WorkoutService.create(currentUser, {
				planId,
				name,
				workoutTypeId,
				workoutTypeName,
				description,
				distance,
				time,
				paceId,
				shortDate,
				scheduledMessage
			});

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				workout: WorkoutTransformer.transform(workout)
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async copy(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const workoutId = Number(req.params.id);
			const dates = req.body.dates;

			const [badDates, messages] = await WorkoutService.copy(currentUser, workoutId, dates);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				bad_dates: badDates, // eslint-disable-line
				messages,
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async listOfWorkoutTypes(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const types = await WorkoutService.listOfWorkoutTypes(currentUser);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				workout_types: (types || []).map((t) => WorkoutTypeTransformer.transform(t)), // eslint-disable-line
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async mark(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const workoutId = Number(req.params.id);

			await WorkoutService.setMarkedAsKeyStatus(currentUser, workoutId, true);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async unmark(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const workoutId = Number(req.params.id);

			await WorkoutService.setMarkedAsKeyStatus(currentUser, workoutId, false);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async like(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const workoutId = Number(req.params.id);

			await WorkoutService.setLikeStatus(currentUser, workoutId, true);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async unlike(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const workoutId = Number(req.params.id);

			await WorkoutService.setLikeStatus(currentUser, workoutId, false);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async getWorkoutsByAthleteId(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const plan = await PlanService.getPlanByUser(currentUser, Number(req.params.user_id), false);
			let workouts = [];
			plan.plan.planWeeks.forEach(planWeek => {
				workouts = workouts.concat(planWeek.workouts);
			});

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				workouts
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async updateWorkoutMessage(req: IRequest, res: Response, next: NextFunction) {
		try {
			const workoutId = Number(req.params.id);
			const scheduledMessage = req.body.scheduled_message;

			await WorkoutService.updateWorkoutMessage(workoutId, scheduledMessage);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		}
		catch (error) {
			return next(error);
		}
	}

}
