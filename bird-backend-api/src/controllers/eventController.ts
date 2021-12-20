import { NextFunction, Request, Response } from 'express';
import * as HttpStatusCodes from 'http-status-codes';
import EventService from '../services/eventService';
import EventTransformer from '../transformers/event';
import ImportantGoalTransformer from '../transformers/importantGoal';
import IRequest from '../interfaces/IRequest';

export default class EventController {

	public async list(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const events = await EventService.list(currentUser.isPaid);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				events: events.map((event) => EventTransformer.transform(event)),
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async listOfImportantGoals(req: Request, res: Response, next: NextFunction) {
		try {
			const goals = await EventService.listOfImportantGoals();

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				goals: goals.map((goal) => ImportantGoalTransformer.transform(goal)),
			});
		}
		catch (error) {
			return next(error);
		}
	}

}
