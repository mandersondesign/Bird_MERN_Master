
import { NextFunction, Response } from 'express';
import * as HttpStatusCodes from 'http-status-codes';
import * as formidable from 'formidable';
import IRequest from '../interfaces/IRequest';
import UserTransformer from '../transformers/user';
import MetaTransformer from '../transformers/meta';
import UserInfoTransformer from '../transformers/userInfo';
import CoachTransformer from '../transformers/coach';
import UserService from '../services/userService';
import PushNotificationService from '../services/pushNotificationService';
import ApplicationError from '../errors/applicationError';
import PlanRepository from '../repository/plan/planRepository';
import {getConnection} from 'typeorm';
import UserType from '../models/user/user_type';
import CoachInfoRepository from '../repository/user/coachInfoRepository';
import CoachPlanToUserRepository from '../repository/subscription/coachPlanToUserRepository';
import StravaAuthRepository from '../repository/strava/stravaAuthRepository';

export default class UserController {
	public async getMe (req: IRequest, res: Response, next: NextFunction) {
		try {
			const user = req.user;

			let hasPlan = false;
			let coachInfo = null;

			if (user.userTypeId === UserType.ATHLETE) {
				const planRepository: PlanRepository = getConnection().getCustomRepository(PlanRepository);
				const lastPlan = await planRepository.getLastPlanByAthlete(user.userId);
				hasPlan = !!lastPlan;

				const stravaAuthRepository: StravaAuthRepository = getConnection().getCustomRepository(StravaAuthRepository);
				user.stravaAuth = await stravaAuthRepository.findByUserId(user.userId);
			} else if (user.userTypeId === UserType.COACH) {
				const coachInfoRepository: CoachInfoRepository = getConnection().getCustomRepository(CoachInfoRepository);
				coachInfo = await coachInfoRepository.findById(user.userId);

				// enrich existing user object
				const coachPlanToUserRepository: CoachPlanToUserRepository = getConnection().getCustomRepository(CoachPlanToUserRepository);
				user.coachPlanToUser = await coachPlanToUserRepository.getByCoachId(user.userId);
			}

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				data: {
					user: UserTransformer.transform(user, hasPlan, coachInfo),
				}
			});
		} catch (error) {
			return next(error);
		}
	}

	public async list (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const limit = req.query.limit && !isNaN(Number(req.query.limit)) ? Number(req.query.limit) : 50; // eslint-disable-line
			const page = req.query.page && !isNaN(Number(req.query.page)) ? Number(req.query.page) : 1;
			const search = req.query.search as string;

			const { users, meta } = await UserService.getAllUsers(currentUser, limit, page, search);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				meta: MetaTransformer.transform(meta),
				data: {
					users: users.map(user => UserTransformer.transform(user))
				}
			});
		} catch (error) {
			return next(error);
		}
	}

	public async patchUserInfo (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;

			await UserService.patchUserInfo(currentUser, {
				eventId: req.body.event_id,
				eventTypeId: req.body.event_type_id,
				raceName: req.body.race_name,
				comment: req.body.comment,
				levelId: req.body.level_id ? Number(req.body.level_id) : null,
				dateOfRace: req.body.date, // "2020-03-23"
				pastExperienceId: req.body.past_experience_id,
				milesPerWeekId: req.body.miles_per_week_id,
				longDistanceId: req.body.long_distance_id,
				personalGoalId: req.body.personal_goal_id,
				goalType: req.body.goal ? req.body.goal.type : null,
				goalTime: req.body.goal ? req.body.goal.value : null,
				days: req.body.days, // [1, 3, 5, 6, 7]
				personalRecords: req.body.personal_record ? req.body.personal_record : null,
				customQuestions: req.body.custom_questions ? req.body.custom_questions : null,
			}, true);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}

	public async updateUserInfo (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;

			await UserService.patchUserInfo(currentUser, {
				eventId: req.body.event_id,
				eventTypeId: req.body.event_type_id,
				raceName: req.body.race_name,
				comment: req.body.comment,
				levelId: req.body.level_id ? Number(req.body.level_id) : null,
				dateOfRace: req.body.date, // "2020-03-23"
				pastExperienceId: req.body.past_experience_id,
				milesPerWeekId: req.body.miles_per_week_id,
				longDistanceId: req.body.long_distance_id,
				personalGoalId: req.body.personal_goal_id,
				goalType: req.body.goal ? req.body.goal.type : null,
				goalTime: req.body.goal ? req.body.goal.value : null,
				days: req.body.days, // [1, 3, 5, 6, 7]
				personalRecords: req.body.personal_record ? req.body.personal_record : null,
				customQuestions: req.body.custom_questions ? req.body.custom_questions : null,
			}, false);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}

	public async getUserInfo (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const userAlias = req.params.alias as number | 'me';

			const userInfo = await UserService.getUserInfo(userAlias === 'me' ? currentUser.userId : userAlias);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				data: {
					user_info: UserInfoTransformer.transform(userInfo) // eslint-disable-line
				}
			});
		} catch (error) {
			return next(error);
		}
	}

	public async getUserById (req: IRequest, res: Response, next: NextFunction) {
		try {
			const userId = req.params.id;
			const user = await UserService.getUserById(Number(userId));

			let hasPlan = false;
			if (user.userTypeId === UserType.ATHLETE) {
				const planRepository: PlanRepository = getConnection().getCustomRepository(PlanRepository);
				const lastPlan = await planRepository.getLastPlanByAthlete(user.userId);
				hasPlan = !!lastPlan;
			} else if (user.userTypeId === UserType.COACH) {
				// enrich existing user object
				const coachPlanToUserRepository: CoachPlanToUserRepository = getConnection().getCustomRepository(CoachPlanToUserRepository);
				user.coachPlanToUser = await coachPlanToUserRepository.getByCoachId(user.userId);
			}

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				data: {
					user: UserTransformer.transform(user, hasPlan),
				}
			});
		} catch (error) {
			return next(error);
		}
	}

	public async updateById (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;

			await UserService.updateUserById(
				currentUser, {
					userId: Number(req.params.id),
					firstName: req.body.first_name,
					lastName: req.body.last_name,
					email: req.body.email,
					phone: req.body.phone,
					address: req.body.address,
					city: req.body.city,
					state: req.body.state,
					zipCode: req.body.zip_code,
					country: req.body.country,
					isActive: req.body.is_active,
					coachPlanId: Number(req.body.coach_plan_id),
				});

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}

	public async uploadAvatar (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;

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

				const avatar = await UserService.updateAvatar(currentUser, file);

				res.status(HttpStatusCodes.OK).json({
					message: 'OK',
					avatar
				});
			});
		} catch (error) {
			console.log(error);
			return next(error);
		}
	}

	public async create (req: IRequest, res: Response, next: NextFunction) {
		try {
			const user = await UserService.create({
				firstName: req.body.first_name,
				lastName: req.body.last_name,
				email: req.body.email,
				rawPassword: req.body.password,
				phone: req.body.phone,
				userTypeId: req.body.user_type_id,
			});

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				data: {
					user: user ? UserTransformer.transform(user) : null,
				}
			});
		} catch (error) {
			return next(error);
		}
	}

	public async getMyCoach (req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;

			const coach = await UserService.getMyCoach(currentUser);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				data: {
					coach: CoachTransformer.transform(coach),
				}
			});
		} catch (error) {
			return next(error);
		}
	}

	public async setSmsNotificationStatus(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;

			await UserService.setSmsNotificationStatus(currentUser, req?.body?.is_sms_enabled);

			res.status(HttpStatusCodes.ACCEPTED).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}

	public async getPushNotification (req: IRequest, res: Response, next: NextFunction) {
		try {
			const session = req.session;

			const fcmToken = await PushNotificationService.findBySessionId(session.sessionId);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				has_token: fcmToken ? true : false, // eslint-disable-line
				token: fcmToken ? fcmToken.token : null,
			});
		} catch (error) {
			return next(error);
		}
	}

	public async addPushNotification (req: IRequest, res: Response, next: NextFunction) {
		try {
			const user = req.user;
			const session = req.session;
			const token = req.body.token;

			await PushNotificationService.addToken(user.userId, session.sessionId, token);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}

}
