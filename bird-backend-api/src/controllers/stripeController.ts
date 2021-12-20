import { NextFunction, Request, Response } from 'express';
import * as HttpStatusCodes from 'http-status-codes';
import StripeService from '../services/stripeService';
import IRequest from '../interfaces/IRequest';
import ApplicationError from '../errors/applicationError';

export default class StripeController {

	public async webhook(req: Request, res: Response) {
		try {
			const event = req.body;

			await StripeService.webhook(event);

			res.status(HttpStatusCodes.OK).json({
				received: true
			});
		}
		catch (error) {
			res.status(HttpStatusCodes.BAD_REQUEST).end();
		}
	}

	public async createCustomer(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const token = req.body.token;

			await StripeService.createCustomer(currentUser, token);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		}
		catch (error) {
			if (error.type) {
				return next(new ApplicationError(error.message));
			}

			error.httpStatusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
			return next(error);
		}
	}

	public async updateCard(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const token = req.body.token;

			await StripeService.updateCard(currentUser, token);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		}
		catch (error) {
			if (error.type) {
				return next(new ApplicationError(error.message));
			}

			error.httpStatusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
			return next(error);
		}
	}
}
