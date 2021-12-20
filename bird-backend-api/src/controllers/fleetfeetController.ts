import { NextFunction, Request, Response } from 'express';
import * as HttpStatusCodes from 'http-status-codes';
import * as requestIp from 'request-ip';
import FleetfeetService from '../services/fleetfeetService';
import SurveyQuestionTransformer from '../transformers/fleetfeet/surveyQuestion';
import FleetfeetEventTransformer from '../transformers/fleetfeet/event';
import UserTransformer from '../transformers/user';
import IRequest from '../interfaces/IRequest';
import ApplicationError from '../errors/applicationError';

export default class EventController {

	public async listOfSurveyQuestions(req: Request, res: Response, next: NextFunction) {
		try {
			const alias = req.params.alias;

			const surveyQuestions = await FleetfeetService.listOfSurveyQuestions(alias);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				survey_questions: surveyQuestions.map((sq) => SurveyQuestionTransformer.transform(sq)), // eslint-disable-line
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async getEventByAlias(req: Request, res: Response, next: NextFunction) {
		try {
			const alias = req.params.alias;

			const event = await FleetfeetService.getEventByAlias(alias);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				event: FleetfeetEventTransformer.transform(event)
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async getWaiver(req: Request, res: Response, next: NextFunction) {
		try {
			const alias = req.params.alias;

			const waiver = await FleetfeetService.getWaiver(alias);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				waiver: {
					text: waiver.text,
				},
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async registration (req: Request, res: Response, next: NextFunction) {
		try {
			const data = await FleetfeetService.registration({
				firstName: req.body.first_name,
				lastName: req.body.last_name,
				email: req.body.email,
				phone: req.body.phone,
				rawPassword: req.body.password,
				// birthDate: req.body.birth_date,
				survey: req.body.survey,
				eventAlias: req.body.event_alias,
			}, requestIp.getClientIp(req));

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				token: data.token,
				user_id: data.user.userId, // eslint-disable-line
				user: UserTransformer.transform(data.user),
			});
		} catch (error) {
			return next(error);
		}
	}

	public async pay (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;

			await FleetfeetService.pay(currentUser, req.body.token, req.body.event_alias);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		} catch (error) {
			if (error.type) {
				return next(new ApplicationError(error.message));
			}

			error.httpStatusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
			return next(error);
		}
	}


	public async testFleetFeetReport(req: Request, res: Response, next: NextFunction) {
		try {
			const url = await FleetfeetService.sendListOfNewUsers();

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				url,
			});
		}
		catch (error) {
			return next(error);
		}
	}
}
