import { NextFunction, Response } from 'express';
import * as HttpStatusCodes from 'http-status-codes';
import ApplicationError from '../errors/applicationError';
import IRequest from '../interfaces/IRequest';
import UserType from '../models/user/user_type';

async function isCoachMiddleware(req: IRequest, response: Response, next: NextFunction) {
	try {
		const currentUser = req.user;

		if (currentUser.userTypeId !== UserType.COACH) {
			return next(new ApplicationError('Allow only for coaches', HttpStatusCodes.FORBIDDEN));
		}

		next();
	} catch (_) {
		return next(new ApplicationError('Wrong token', HttpStatusCodes.UNAUTHORIZED));
	}
}

export default isCoachMiddleware;
