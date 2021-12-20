/* eslint-disable no-magic-numbers */
import { NextFunction, Response, Request } from 'express';
import * as HttpStatusCodes from 'http-status-codes';
import StravaService from '../services/stravaService';
import IRequest from '../interfaces/IRequest';
import env from '../env';

export default class StravaController {

	public async exchangeToken (req: Request, res: Response) {
		try {
			const userId = Number(req.query.state);
			await StravaService.connect(userId, req.query.code as string);

			if (req.query.error && req.query.error === 'access_denied') {
				res.redirect(`${env.FRONTEND_URL}/unsucessful`);
				return;
			}

			res.redirect(`${env.FRONTEND_URL}/success`);
		} catch (error) {
			res.redirect(`${env.FRONTEND_URL}/error`);
		}
	}

	public async oauthRedirect (req: IRequest, res: Response) {
		const currentUser = req.user;

		res.redirect(
			// eslint-disable-next-line
			`http://www.strava.com/oauth/mobile/authorize?client_id=${env.STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${env.BACKEND_URL}/v1/strava/exchange_token&approval_prompt=force&scope=read_all,activity:read_all,profile:read_all&state=${currentUser.userId}`
		);
	}

	public async deauthorize (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			await StravaService.deauthorize(currentUser);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}

	public async test (req: IRequest, res: Response, next: NextFunction) {
		try {
			const data = await StravaService.grabActivity(req.query.a as unknown as number, req.query.w as unknown as number); // eslint-disable-line

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				data,
			});
		} catch (error) {
			return next(error);
		}
	}

	public async webhook (req: Request, res: Response, next: NextFunction) {
		try {
			if (req.body.object_type === 'activity' && req.body.aspect_type === 'create') {
				await StravaService.grabActivity(req.body.owner_id, req.body.object_id);
			}

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}

	public async verifyWebhook (req: Request, res: Response) {
		const mode = req.query['hub.mode'];
		const token = req.query['hub.verify_token'];
		const challenge = req.query['hub.challenge'];

		if (mode && token) {
			if (mode === 'subscribe' && token === env.STRAVA_VERIFY_TOKEN) {
				console.log('WEBHOOK_VERIFIED');
				res.json({'hub.challenge':challenge});
			} else {
				res.sendStatus(403);
			}
		}
	}

	public async getActivityChart (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const workoutId = Number(req.params.id);

			const data = await StravaService.getActivityChart(currentUser, workoutId);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				data,
			});
		} catch (error) {
			return next(error);
		}
	}

	public async listOfActivities (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const date = req.query.date as string;

			const data = await StravaService.listOfActivities(currentUser, date);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				data,
			});
		} catch (error) {
			return next(error);
		}
	}

	public async match (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const activityId = req.body.activity_id;
			const workoutId = req.body.workout_id;
			await StravaService.match(currentUser, {
				workoutId,
				activityId,
				isManual: true,
			});

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}

	public async sync (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;

			await StravaService.sync(currentUser);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}
}
