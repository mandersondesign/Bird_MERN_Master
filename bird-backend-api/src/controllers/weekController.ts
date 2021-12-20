import { NextFunction, Response } from 'express';
import * as HttpStatusCodes from 'http-status-codes';
import PlanService from '../services/planService';
import PlanWeekTransformer from '../transformers/planWeek';
import IRequest from '../interfaces/IRequest';

export default class WorkoutController {

	public async getById(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const weekId = Number(req.params.id);

			const week = await PlanService.getWeekById(currentUser, weekId);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				week: PlanWeekTransformer.transform(week),
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async updateById(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const weekId = Number(req.params.id);
			const description = req.body.description;

			await PlanService.updateWeekById(currentUser, weekId, description);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		}
		catch (error) {
			return next(error);
		}
	}

}
