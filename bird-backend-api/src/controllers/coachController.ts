import { NextFunction, Response, Request } from 'express';
import * as HttpStatusCodes from 'http-status-codes';
import * as formidable from 'formidable';
import IRequest from '../interfaces/IRequest';
import AthleteService from '../services/athleteService';
import UserService from '../services/userService';
import PlanService from '../services/planService';
import AuthService from '../services/authService';
import StripeService from '../services/stripeService';
import WorkoutLibraryService from '../services/workoutLibraryService';
import CoachTransformer from '../transformers/coach';
import ApplicationError from '../errors/applicationError';
import CoachInfoTransformer from '../transformers/coachInfo';
import StripeCardTransformer from '../transformers/stripeCard';

export default class CoachController {

	public async getMetaForAtletes(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const totalAthletesCount = await AthleteService.getTotalAthletesCount(currentUser.userId);
			const totalActiveAthletesCount = await AthleteService.getTotalActiveAthletesCount(currentUser.userId);
			const totalUnassignedAthletesCount = await AthleteService.getTotalUnassignedAthletesCount(currentUser.userId);
			const plans = await PlanService.getPlanListByCoach(currentUser.userId);
			const amountOfPlanTemplates = await PlanService.getAmountOfCoachTemplates(currentUser.userId);
			const amountOfWorkouts = await WorkoutLibraryService.count(currentUser.userId);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				meta: {
					athletes: [{
						name: 'All Athletes',
						amount: totalAthletesCount,
					}, {
						name: 'Unassigned',
						amount: totalUnassignedAthletesCount,
					}],
					plans: [{
						plan_template_id: 0, // eslint-disable-line
						name: 'All Active Athletes',
						amount: totalActiveAthletesCount
					}].concat(
						plans.map((plan) => ({
							plan_template_id: plan.plan_template_id, // eslint-disable-line
							name: String(plan.name),
							amount: Number(plan.amount),
						}))
					),
					library: [{
						name: 'Plan templates',
						amount: amountOfPlanTemplates
					}, {
						name: 'Workouts',
						amount: amountOfWorkouts
					}],
				}
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async requestCallback(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;

			await AthleteService.requestCallback(currentUser.userId);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async getCoachById(req: Request, res: Response, next: NextFunction) {
		try {
			const coachId = Number(req.params.coach_id);

			const coach = await UserService.getCoachById(coachId);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				coach: CoachTransformer.transform(coach),
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async getCoachInfoById(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const coachId = currentUser.userId;

			const info = await UserService.getCoachInfoById(coachId);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				info: CoachInfoTransformer.transform(info),
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async updateCoachInfoById(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const coachId = currentUser.userId;
			const info = req.body.info;

			await UserService.updateCoachInfoById(coachId, info);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async updateMeasurement(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const measurementId = req.body.measurement_id;

			await UserService.updateMeasurement(currentUser, measurementId);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async uploadCoachImage (req: Request, res: Response, next: NextFunction) {
		try {
			const coachId = Number(req.params.coach_id);

			const form = new formidable.IncomingForm({
				maxFileSize: 10 * 1024 * 1024, // eslint-disable-line
			});
			form.parse(req, async (err : ApplicationError, fields, files) => {
				if (err) {
					if (err.message.includes('maxFileSize')) {
						return next(new ApplicationError('File can not be more than 10 mb'));
					}

					return next(new ApplicationError(err.message));
				}

				const file = files.data;
				if (!file) {
					return next(new ApplicationError('No file'));
				}

				const image = await UserService.uploadCoachImage(coachId, file);

				res.status(HttpStatusCodes.OK).json({
					message: 'OK',
					image
				});
			});
		} catch (error) {
			return next(error);
		}
	}

	public async sendInvite(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;

			await AuthService.sendInviteToCoach(currentUser, {
				firstName: (req.body.first_name || '').trim(),
				lastName: (req.body.last_name || '').trim(),
				email: (req.body.email || '').toLowerCase().trim(),
				phone: req.body.phone,
			});

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async getListOfCards(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;

			const cards = await StripeService.listOfCards(currentUser);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				stripe_cards: (cards || []).map((card) => StripeCardTransformer.transform(card)), // eslint-disable-line
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async getCustomQuestions(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const coachId = req.params.coach_id === 'me' ? currentUser.userId : Number(req.params.coach_id);

			const questions = await UserService.getCustomQuestions(coachId);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				questions,
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async updateCustomQuestions(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const coachId = req.params.coach_id === 'me' ? currentUser.userId : Number(req.params.coach_id);
			const questions = req.body.questions;

			await UserService.updateCustomQuestions(coachId, questions);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		}
		catch (error) {
			return next(error);
		}
	}

}
