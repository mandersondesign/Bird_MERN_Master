import { NextFunction, Request, Response } from 'express';
import * as HttpStatusCodes from 'http-status-codes';
import ProgramService from '../services/programService';
import ProgramTransformer from '../transformers/program';
import IRequest from '../interfaces/IRequest';
import ApplicationError from '../errors/applicationError';

export default class ProgramController {

	public async getProgramByAlias(req: Request, res: Response, next: NextFunction) {
		try {
			const alias = req.params.alias;

			const program = await ProgramService.getProgramByAlias(alias);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				program: ProgramTransformer.transform(program),
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async pay (req: IRequest, res: Response, next: NextFunction) {
		try {
			const { email, coupon, token, program } = req.body;

			const { paymentIntent } = await ProgramService.pay({
				email,
				coupon,
				token,
				programAlias: program,
			});

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				transactionId: paymentIntent
			});
		} catch (error) {
			if (error.type) {
				return next(new ApplicationError(error.message));
			}

			error.httpStatusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
			return next(error);
		}
	}

	public async checkCoupon(req: Request, res: Response, next: NextFunction) {
		try {
			const coupon = await ProgramService.checkCoupon(req.params.alias, req.params.coupon);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				coupon,
			});
		}
		catch (error) {
			return next(error);
		}
	}

}
