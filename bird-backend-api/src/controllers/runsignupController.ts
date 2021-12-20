import { NextFunction, Request, Response } from 'express';
import * as HttpStatusCodes from 'http-status-codes';
import RunsignupService from '../services/runsignupService';

export default class RunsignupController {

	public async importRunsignupData(req: Request, res: Response, next: NextFunction) {
		try {
			const { apiKey, apiSecret, raceId, mainTag, endDate } = req.body as any;

			await RunsignupService.importRunsignupData(apiKey, apiSecret, raceId, mainTag, endDate);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK'
			});
		}
		catch (error) {
			return next(error);
		}
	}

	/* public async query(req: Request, res: Response) {
		try {
			const event = req.body;

			await RunsignupService.query();

			res.status(HttpStatusCodes.OK).json({
				received: true
			});
		}
		catch (error) {
			res.status(HttpStatusCodes.BAD_REQUEST).end();
		}
	} */
}
