import { Response } from 'express';
import * as HttpStatusCodes from 'http-status-codes';
import AppleService from '../services/appleService';
import ProgramService from '../services/programService';
import IRequest from '../interfaces/IRequest';

export default class AppleController {

	/*
	public async webhook(req: Request, res: Response) {
		try {
			const event = req.body;

			await AppleService.webhook(event);

			res.status(HttpStatusCodes.OK).json({
				received: true
			});
		}
		catch (error) {
			res.status(HttpStatusCodes.BAD_REQUEST).end();
		}
	}
	*/

	public async savePayment(req: IRequest, res: Response) {
		try {
			const user = req.user;
			const { coupon, appleTransactionId, appleTransactionPayload } = req.body;

			const program = await ProgramService.getProgramByAlias(req.params.alias);

			await AppleService.savePayment(user, program, coupon, appleTransactionId, appleTransactionPayload);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK'
			});
		} catch (error) {
			res.status(HttpStatusCodes.BAD_REQUEST).end();
		}
	}

	public async checkPayment(req: IRequest, res: Response) {
		try {
			const user = req.user;

			const program = await ProgramService.getProgramByAlias(req.params.alias);

			await AppleService.checkPayment(user, program);

			res.status(HttpStatusCodes.OK).json({
			});
		} catch (error) {
			res.status(HttpStatusCodes.BAD_REQUEST).end();
		}
	}
}
