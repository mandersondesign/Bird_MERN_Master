import { NextFunction, Request, Response } from 'express';
import * as HttpStatusCodes from 'http-status-codes';
import SubscriptionService from '../services/subscriptionService';
import CoachPlanTransformer from '../transformers/coachPlan';
import AthleteSubscriptionPlanTransformer from '../transformers/athleteSubscriptionPlan';
import IRequest from '../interfaces/IRequest';
import ApplicationError from '../errors/applicationError';

export default class SubscriptionController {

	public async listForCoach(req: Request, res: Response, next: NextFunction) {
		try {
			const showAll = Boolean(req.query.show_all === 'true');
			const plans = await SubscriptionService.listForCoach(showAll);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				coach_plans: plans.map((plan) => CoachPlanTransformer.transform(plan)), // eslint-disable-line
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async setPlanForCoach(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const coachPlanId = Number(req.body.coach_plan_id);
			const token = req.body.token;

			await SubscriptionService.setPlanForCoach(currentUser, coachPlanId, token);

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

	public async getAthleteSubscriptionPlanById(req: Request, res: Response, next: NextFunction) {
		try {
			const plan = await SubscriptionService.getAthleteSubscriptionPlanById(Number(req.params.id));

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				athlete_plan: AthleteSubscriptionPlanTransformer.transform(plan), // eslint-disable-line
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async setSubscriptionPlanForAthlete(req: IRequest, res: Response, next: NextFunction) {
		try {
			const email = req.body.email;
			const athletePlanId = Number(req.body.athlete_plan_id);
			const token = req.body.token;

			await SubscriptionService.setSubscriptionPlanForAthlete(email, athletePlanId, token);

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
