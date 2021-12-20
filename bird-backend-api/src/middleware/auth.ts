import { NextFunction, Response } from 'express';
import * as HttpStatusCodes from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import * as requestIp from 'request-ip';
import { getConnection, Repository } from 'typeorm';
import env from '../env';
import ApplicationError from '../errors/applicationError';
import IDecodedToken from '../interfaces/IDecodedToken';
import IRequest from '../interfaces/IRequest';
import Session from '../models/user/session';

async function authMiddleware(req: IRequest, response: Response, next: NextFunction) {
	try {
		const token : string = String(req.headers.token || req.query.token).toString();
		const ip : string = requestIp.getClientIp(req);

		const data : IDecodedToken = Object(jwt.verify(token, env.JWT_SECRET));
		const sessionRepository : Repository<Session> = getConnection().getRepository(Session);

		const session : Session = await sessionRepository.findOne({
			sessionId: data.session_id
		}, {
			relations: ['user']
		});

		if (!session || !session.isActive || !session.user) {
			return next(new ApplicationError('Wrong token', HttpStatusCodes.UNAUTHORIZED));
		}

		if (!session.user.isActive) {
			return next(new ApplicationError('User was disabled', HttpStatusCodes.UNAUTHORIZED));
		}

		sessionRepository.merge(session, {
			lastUserTime: new Date(),
			lastUserIp: ip
		});
		await sessionRepository.save(session);

		req.session = session;
		req.user = session.user;
		next();
	} catch (_) {
		return next(new ApplicationError('Wrong token', HttpStatusCodes.UNAUTHORIZED));
	}
}

export default authMiddleware;
