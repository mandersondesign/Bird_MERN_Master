import { NextFunction, Response, Request } from 'express';
import * as formidable from 'formidable';
import * as HttpStatusCodes from 'http-status-codes';
import AthleteService from '../services/athleteService';
import PlanService from '../services/planService';
import WorkoutService from '../services/workoutService';
import AthleteTransformer from '../transformers/athlete';
import PlanTemplateTransformer from '../transformers/planTemplate';
import IRequest from '../interfaces/IRequest';
import PaceTransformer from '../transformers/pace';
import WorkoutStatus from '../models/plan/workout_status';
import TwilioService from '../services/twilioService';
import PushNotificationService from '../services/pushNotificationService';
import WorkoutLibraryService from '../services/workoutLibraryService';
import WorkoutLibraryTransformer from '../transformers/workoutLibrary';
import UserType from '../models/user/user_type';
import CoachInfoRepository from '../repository/user/coachInfoRepository';
import { getConnection } from 'typeorm';
import UserService from '../services/userService';
import CoachInfo from '../models/user/coach_info';
import AuthService from '../services/authService';
import ApplicationError from '../errors/applicationError';
import to from 'await-to-js';
import * as parse from 'csv-parse/lib/sync';
import SendBirdService from '../services/sendBirdService';
import { Server } from 'socket.io';
import User from '../models/user/user';
import WorkoutTemplate from '../models/plan/workout_template';
import Workout from '../models/plan/workout';

const MessagingResponse = require('twilio').twiml.MessagingResponse;

export default class DefaultController {

	public async getVersion(req: Request, res: Response, next: NextFunction) {
		try {
			res.status(HttpStatusCodes.OK).json({
				version: '3.9.5'
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async getCurrentTime(req: Request, res: Response, next: NextFunction) {
		try {
			const date = new Date();

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				date: date.toLocaleString(),
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async mock(req: Request, res: Response, next: NextFunction) {
		try {
			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async search(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const query = req.query.query as string;
			const athletes = await AthleteService.search(query, currentUser.userId);
			const planTemplates = await PlanService.searchPlanTemplates(query, currentUser.userId);
			const { workouts } = await WorkoutLibraryService.list(currentUser, 5, 1, 'name', 'DESC', query); // eslint-disable-line

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				athletes: (athletes || []).map((athlete) => AthleteTransformer.transform(athlete)),
				workouts: (workouts || []).map((w) => WorkoutLibraryTransformer.transform(w)),
				plan_templates: (planTemplates || []).map((template) => PlanTemplateTransformer.transform(template)), // eslint-disable-line
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async listOfPaces(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			let paces = await PlanService.listOfPaces();

			let coachId;
			if (currentUser.userTypeId === UserType.COACH) {
				coachId = currentUser.userId;
			} else if (currentUser.userTypeId === UserType.ATHLETE) {
				const coach = await UserService.getMyCoach(currentUser);
				coachId = coach.userId;
			}

			if (coachId) {
				const coachInfoRepository: CoachInfoRepository = getConnection().getCustomRepository(CoachInfoRepository);
				const coachInfo = await coachInfoRepository.findById(coachId);

				if (coachInfo && coachInfo.measurementId === CoachInfo.MEASUREMENT_ID_KM) {
					paces = paces.map((p) => ({
						...p,
						name: (p.name || '').replace('Mile', 'Kilometer'),
						description: (p.description || '').replace('Mile', 'Kilometer').replace('mile', 'kilometer'),
					}));
				}
			}

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				paces: paces.map((p) => PaceTransformer.transform(p)),
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async twilioSMS(req: Request, res: Response) {
		const twiml = new MessagingResponse();

		const athleteId = Number(req.body.athlete_id);
		const workoutId = Number(req.body.workout_id);
		const planId = Number(req.body.plan_id);

		const didYouRun = ((req.body.did_you_run) as string).trim();
		const completedByPlan = ((req.body.to_plan) as string).trim();
		const notes = ((req.body.notes) as string).trim();

		try {
			let statusId = WorkoutStatus.NO_RESULTS;
			if (didYouRun && didYouRun.length > 0) {
				if (didYouRun[0].toLowerCase() === 'y') {
					statusId = WorkoutStatus.DID_IT;
				} else if (completedByPlan && completedByPlan.length > 0 && completedByPlan[0].toLowerCase() === 'y') {
					statusId = WorkoutStatus.PARTIALLY_DONE;
				} else {
					statusId = WorkoutStatus.DID_NOT_DO_IT;
				}
			}
			await to(WorkoutService.changeStatus(null, workoutId, statusId, athleteId));

			await to(TwilioService.saveOneComment({
				text: notes,
				planId,
				workoutId,
				athleteId
			}));
			const plan = await PlanService.getPlanById(planId);
			if (plan) {
				const io: Server = req.app.get('socketIo');
				const sockets = await io.allSockets();
				sockets.forEach(socketId => {
					const socket = io.sockets.sockets.get(socketId);
					const user: User = socket.data;
					if (user.userId === plan.coachId) {
						if (!socket.disconnected) {
							io.to(socket.id).emit('new_message', { id: socket.id, msg: notes, type: 'msg', isFromCoach: false, to: plan.coachId, from: athleteId });
						}
					}
				});
			}
		} catch (error) {
			res.writeHead(HttpStatusCodes.BAD_REQUEST, { 'Content-Type': 'text/xml' });
			twiml.message(error.toString());
			return res.end(twiml.toString());
		}

		res.writeHead(HttpStatusCodes.OK, { 'Content-Type': 'text/xml' });
		twiml.message('Ok');
		res.end(twiml.toString());
	}

	public async twilioTest(req: Request, res: Response, next: NextFunction) {
		try {
			const phone = req.body.phone;
			const workoutId = req.body.workout_id;

			await TwilioService.startTestFlow(phone, workoutId);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}

	public async twilioTestMsg(req: Request, res: Response, next: NextFunction) {
		try {
			const phone = req.body.phone;
			const text = req.body.text;

			await TwilioService.sendTestMsg(phone, text);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}

	public async sendTestPush(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = req.body.user_id;
			const workoutId = req.body.workout_id;
			const data = req.body.data;
			const title = req.body.title;
			const body = req.body.body;
			const typeId = req.body.type_id || 1;

			if (data) {
				data.type_id = typeId; // eslint-disable-line
			}

			await PushNotificationService.sendToUser(userId, {
				title: title || 'Title',
				body: body || 'Text',
				workoutId,
				typeId
			}, data);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}

	public async sendPushFromChat(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const action = req.body.action; // 'tag', 'reaction'
			const toUserIds = req.body.to_user_ids;
			const channelUrl = req.body.channel_url;
			const channelName = req.body.channel_name;
			const messageId = req.body.message_id;
			const messageText = req.body.message_text;

			await PushNotificationService.sendPushFromChat(currentUser, {
				action,
				toUserIds,
				channelUrl,
				channelName,
				messageId,
				messageText
			});

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}

	public async uploadFile(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;

			const form = new formidable.IncomingForm({
				maxFileSize: 10 * 1024 * 1024, // eslint-disable-line
			});
			form.parse(req, async (err: ApplicationError, fields, files) => {
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

				const link = await UserService.uploadFile(currentUser, file);

				res.status(HttpStatusCodes.OK).json({
					message: 'OK',
					link
				});
			});
		} catch (error) {
			console.log(error);
			return next(error);
		}
	}

	public async batchInvite(req: Request, res: Response, next: NextFunction) {
		try {
			const file = (req as any).file;
			if (!file || !file.buffer) {
				throw new ApplicationError('File is required');
			}

			const csvFile = parse(file.buffer.toString(), {
				columns: true,
				skip_empty_lines: true, // eslint-disable-line
			});

			const errors = [];
			for (const line of csvFile) {
				const email = (line.email || '').toLowerCase().trim();

				const [error] = await to(AuthService.sendInvite(line.coachId, {
					firstName: (line.firstName || '').trim(),
					lastName: (line.lastName || '').trim(),
					email,
					phone: line.phone,
				}, false, line.planTemplateId));

				if (error) {
					errors.push(email);
				}
			}

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				errors,
			});
		} catch (error) {
			return next(error);
		}
	}

	public async sendbirdWebhook(req: Request, res: Response, next: NextFunction) {
		try {
			await SendBirdService.reportWebhook(req.body);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}

	public async zapierInvite(req: Request, res: Response, next: NextFunction) {
		try {
			await AuthService.sendInvite(req.body.coach_id, {
				firstName: (req.body.first_name || '').trim(),
				lastName: (req.body.last_name || '').trim(),
				email: (req.body.email || '').toLowerCase().trim(),
				phone: req.body.phone,
			}, false, req.body.plan_template_id);

			await PlanService.getPlanTemplateById(null, req.body.plan_template_id);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}

	public async copyPlanTemplate(req: Request, res: Response, next: NextFunction) {
		try {
			const coachId = req.body.coach_id;
			const planTemplateId = req.body.plan_template_id;

			await PlanService.copyPlanTemplate(planTemplateId, coachId);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}

	public async updatePlanMessagesByTemplate(req: Request, res: Response, next: NextFunction) {
		try {
			const planTemplateId = req.body.planTemplateId;
			const planTemplate = await PlanService.getPlanTemplate(planTemplateId);
			const plans = await PlanService.getPlansByTemplateId(planTemplate.planTemplateId);
			const planIds = plans.map(p => p.planId);
			await PlanService.updatePlanWelcomeMessage(planIds, planTemplate.scheduledMessage);

			let workouts: Workout[] = [];
			let workoutsTemplates: WorkoutTemplate[] = [];

			planTemplate.planPhaseTemplates.forEach(phTemplate => {
				phTemplate.planWeekTemplates.forEach(pwTemplate => {
					workoutsTemplates = workoutsTemplates.concat(pwTemplate.workoutTemplates);
				});
			});

			plans.forEach(plan => {
				plan.planWeeks.forEach(planWeek => {
					workouts = workouts.concat(planWeek.workouts);
				});
			});

			for (const wTemplate of workoutsTemplates) {
				const currentWorkouts = workouts.filter(w => w.workoutTemplateId === wTemplate.workoutTemplateId);
				const ids = currentWorkouts.map(w => w.workoutId);
				await WorkoutService.updateWorkoutsMessage(ids, wTemplate.scheduledMessage);
			}

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}
}
