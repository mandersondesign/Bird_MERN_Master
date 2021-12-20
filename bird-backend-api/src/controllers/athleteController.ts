import { NextFunction, Response } from 'express';
import * as HttpStatusCodes from 'http-status-codes';
import AthleteService from '../services/athleteService';
import PlanService from '../services/planService';
import AthleteTransformer from '../transformers/athlete';
import UserService from '../services/userService';
import IRequest from '../interfaces/IRequest';
import MetaTransformer from '../transformers/meta';
import AuthService from '../services/authService';
import MessageTransformer from '../transformers/message';
import { SortType } from '../shared/enums';

const MAX_RISK = 1;
const MEDIUM_RISK = 2;
const MIN_RISK = 3;

export default class AthleteController {

	public constructor() {
		this.getAthletesByPlanTemplateId = this.getAthletesByPlanTemplateId.bind(this);
	}

	public async list(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const limit = req.query.limit && !isNaN(Number(req.query.limit)) ? Number(req.query.limit) : 10;
			const page = req.query.page && !isNaN(Number(req.query.page)) ? Number(req.query.page) : 1;
			const sortField = req.query.sort as string;
			const sortType = req.query.sort_type as SortType;
			const { athletes, meta } = await AthleteService.list(currentUser.userId, limit, page, sortField, sortType);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				meta: MetaTransformer.transform(meta),
				athletes: athletes.map((athlete) => AthleteTransformer.transform(athlete)),
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async listAllAthletes(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const { athletes, meta } = await AthleteService.listAll(currentUser.userId);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				meta: MetaTransformer.transform(meta),
				athletes: athletes.map((athlete) => AthleteTransformer.transform(AthleteTransformer.transformMessages(athlete, currentUser.userId))),
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async unassignedList(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const limit = req.query.limit && !isNaN(Number(req.query.limit)) ? Number(req.query.limit) : 10;
			const page = req.query.page && !isNaN(Number(req.query.page)) ? Number(req.query.page) : 1;
			const sortField = req.query.sort as string;
			const sortType = req.query.sort_type as SortType;
			const { athletes, meta } = await AthleteService.unassignedList(currentUser.userId, limit, page, sortField, sortType);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				meta: MetaTransformer.transform(meta),
				athletes: athletes.map((athlete) => AthleteTransformer.transform(athlete)),
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async getAthletesByPlanTemplateId(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const planTemplateId = req.params.plan_template_id ? Number(req.params.plan_template_id) : 0;
			const limit = req.query.limit && !isNaN(Number(req.query.limit)) ? Number(req.query.limit) : 10;
			const page = req.query.page && !isNaN(Number(req.query.page)) ? Number(req.query.page) : 1;
			const sortField = req.query.sort as string;
			const sortType = req.query.sort_type as SortType;
			const { athletes, meta } = await AthleteService.getAthletesByPlanTemplateId(currentUser.userId, Number(planTemplateId), limit, page, sortField, sortType);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				meta: MetaTransformer.transform(meta),
				athletes: athletes.map((athlete) => {
					let weeksUntilRace = null;
					const dateOfRace = athlete.userInfo && athlete.userInfo[0] ? athlete.userInfo[0].dateOfRace : null;
					if (dateOfRace) {
						if (dateOfRace < new Date()) {
							weeksUntilRace = null; // keep it empty
						} else {
							weeksUntilRace = PlanService.weeksBetween(new Date(), dateOfRace);
						}
					}

					if (sortField === 'date') {
						if (weeksUntilRace && weeksUntilRace < 3) { // eslint-disable-line
							athlete.preRisk = MAX_RISK;
						} else if (weeksUntilRace && weeksUntilRace < 6) { // eslint-disable-line
							athlete.preRisk = MEDIUM_RISK;
						} else {
							athlete.preRisk = MIN_RISK;
						}
					}

					return AthleteTransformer.fullTransform(athlete, weeksUntilRace);
				}),
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async getById(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const userId = req.params.id;

			const athlete = await AthleteService.getById(currentUser, Number(userId));

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				athlete: AthleteTransformer.transform(athlete)
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async deleteById(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const userId = req.params.id;

			await UserService.deleteAthleteById(currentUser, Number(userId));

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async assignPlan(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const athleteId = Number(req.params.id);
			const planTemplateId = req.body.plan_template_id;
			const minMilesPerWeek = req.body.min ? Number(req.body.min) : null;
			const maxMilesPerWeek = req.body.max ? Number(req.body.max) : null;
			const date = req.body.date;

			await PlanService.setPlan(currentUser, {
				athleteId,
				planTemplateId,
				date,
				minMilesPerWeek,
				maxMilesPerWeek
			});

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async sendInvite(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;

			await AuthService.sendInvite(currentUser.userId, {
				firstName: (req.body.first_name || '').trim(),
				lastName: (req.body.last_name || '').trim(),
				email: (req.body.email || '').toLowerCase().trim(),
				phone: req.body.phone,
			}, true, null, null, 'coachinvite');

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}

	public async resendInvite(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const athleteId = Number(req.params.id);

			await AuthService.resendInvite(currentUser, athleteId);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}

	public async getMessages(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const athleteId = Number(req.params.id);

			const messages = await AthleteService.getMessages(currentUser, athleteId);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				messages: messages.map((m) => MessageTransformer.transform(m)),
			});
		} catch (error) {
			return next(error);
		}
	}

	public async getNote(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const userId = req.params.id;

			const note = await AthleteService.getNote(currentUser, Number(userId));

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				data: {
					note
				}
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async setNote(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const userId = req.params.id;
			const notes = req.body.note;

			await AthleteService.setNote(currentUser, Number(userId), notes);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		}
		catch (error) {
			return next(error);
		}
	}

}
