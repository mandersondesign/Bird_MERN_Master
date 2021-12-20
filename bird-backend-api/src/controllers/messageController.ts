import { NextFunction, Request, Response } from 'express';
import * as HttpStatusCodes from 'http-status-codes';
import { messageValidatorModel } from '../validators/message';
import { dmvValidatorModel } from '../validators/dm';
import AthleteService from '../services/athleteService';
import TwilioService from '../services/twilioService';
import MessageService from '../services/messageService';
import UserService from '../services/userService';
import { Server } from 'socket.io';
import User from '../models/user/user';
import UserType from '../models/user/user_type';
import IRequest from 'interfaces/IRequest';


export default class MessageController {

	public async sendMessageToGroup(req: Request, res: Response, next: NextFunction) {
		try {
			const { error, value } = messageValidatorModel.validate(req.body);
			if (error) {
				return res.status(HttpStatusCodes.BAD_REQUEST).json(error);
			}
			const request = req as any;
			const user = request.user;
			const users = value.users ? value.users.map(u => ({
				userId: u.user_id,
				planId: u.plan_id
			})) : [];
			const planIds = value.plan_ids || [];
			const message = value.message;

			let athletes = [];
			let athletesByPlan = [];

			if (users.length > 0) {
				const userIds = users.map(u => u.userId);
				athletes = await AthleteService.getAthletesByIds(userIds, user.userId);
			}

			if (planIds.length > 0) {
				athletesByPlan = await AthleteService.getAthletesByPlanIds(planIds, user.userId);
			}

			const userInfo = users.concat(athletesByPlan.map((athlete) => (
				{
					userId: athlete.userId,
					planId: athlete.planOfAthlete[0].planId,
				}
			)));

			const allAthletes = athletes.concat(athletesByPlan);

			const promises = [];

			allAthletes.forEach(athlete => {
				const userFounded = userInfo.find(u => u.userId === athlete.userId);
				const planExist = athlete.planOfAthlete.find(p => p.planId === userFounded.planId);
				if (planExist && athlete.isSmsEnabled) {
					const promise = new Promise(async (resolve) => {
						try {
							const msg = await TwilioService.sendMessage(athlete.phone, message, planExist.planId, athlete.userId);
							resolve({ user: athlete, msg });
						} catch (err) {
							resolve({ user: athlete, msg: 'unable to send message for thi user', err });
						}
					});
					promises.push(promise);
				}
			});
			const responses = await Promise.all(promises);
			res.status(HttpStatusCodes.OK).json({
				responses
			});
		}
		catch (error) {
			return next(error);
		}
	}

	public async receiveMessageFromAthlete(req: Request, res: Response, next: NextFunction) {
		try {
			const phone: string = req.body.From;
			const msg: string = req.body.Body;
			const phoneFormatted = phone.replace('+', '');
			const phoneFormattedWithOutCountry = phone.replace('+1', '');
			const athlete = await AthleteService.getAthleteByPhone(phoneFormatted, phoneFormattedWithOutCountry);
			if (!athlete) {
				return res.status(HttpStatusCodes.NOT_FOUND).json({
					success: false, msg: `user with the phone: ${phone} was not found`
				});
			}

			const coach = await UserService.getMyCoach(athlete);

			if (!coach) {
				return res.status(HttpStatusCodes.NOT_FOUND).json({
					success: false, msg: `this user with id ${athlete.userId} doesnt have any coach attached`
				});
			}

			await MessageService.sendMessage(msg, coach.userId, athlete.userId, true);
			const io: Server = req.app.get('socketIo');
			const sockets = await io.allSockets();
			sockets.forEach(socketId => {
				const socket = io.sockets.sockets.get(socketId);
				const user: User = socket.data;
				if (user.userId === coach.userId) {
					if (!socket.disconnected) {
						io.to(socket.id).emit('new_message', { id: socket.id, msg, type: 'msg', isFromCoach: false, to: coach.userId, from: athlete.userId });
					}
				}
			});
			res.status(HttpStatusCodes.OK).json({
				success: true
			});
		} catch (error) {
			return next(error);
		}
	}

	public async sendDM(req: Request, res: Response, next: NextFunction) {
		try {
			const { error, value } = dmvValidatorModel.validate(req.body);
			if (error) {
				return res.status(HttpStatusCodes.BAD_REQUEST).json(error);
			}

			const { user_id_from: userFromId, user_id_to: userToId, message, is_sent_by_coach: sentByCoach } = value;

			const userFrom = await UserService.getUserById(userFromId);

			if (!userFrom) {
				return res.status(HttpStatusCodes.NOT_FOUND).json({
					success: false, msg: `user with the id: ${userFromId} was not found`
				});
			}

			const userTo = await UserService.getUserById(userToId);

			if (!userTo) {
				return res.status(HttpStatusCodes.NOT_FOUND).json({
					success: false, msg: `user with the id: ${userToId} was not found`
				});
			}

			const coachId = sentByCoach ? userFrom.userId : userTo.userId;
			const athleteId = sentByCoach ? userTo.userId : userFrom.userId;
			await TwilioService.sendTwillioSMS(userTo.phone, message);
			await MessageService.sendMessage(message, coachId, athleteId, !sentByCoach);
			res.status(HttpStatusCodes.OK).json({
				success: true
			});

		} catch (error) {
			return next(error);
		}
	}

	public async getCoachMessages(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = req.query.userId;
			if (!userId) {
				return res.status(HttpStatusCodes.BAD_REQUEST).json({
					success: false, msg: 'user id is required as query param'
				});
			}
			const request = req as any;
			const user: User = request.user;

			if (user.userTypeId !== UserType.COACH) {
				return res.status(HttpStatusCodes.FORBIDDEN).json({
					success: false, msg: 'this endpoints is only for coach role'
				});
			}

			const athelete = await AthleteService.getById(user, Number(userId));

			if (!athelete) {
				return res.status(HttpStatusCodes.NOT_FOUND).json({
					success: false, msg: `user with the id: ${userId} was not found`
				});
			}

			const messages = await MessageService.getMessagesForCoach(user.userId, athelete.userId);
			res.status(HttpStatusCodes.OK).json({
				success: true, messages
			});

		} catch (error) {
			return next(error);
		}
	}

	public async setReadDate(req: Request, res: Response, next: NextFunction) {
		try {
			const messageIds = req.body.message_ids;
			if (messageIds?.length === 0) {
				return res.status(HttpStatusCodes.BAD_REQUEST).json({
					success: false, msg: 'message_ids cannot be empty'
				});
			}
			await MessageService.setReadDate(messageIds);
			res.status(HttpStatusCodes.OK).json({
				success: true
			});
		} catch (error) {
			return next(error);
		}
	}

	public async setSmsNotificationStatus(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = await UserService.getUserById(Number.parseInt(req.params.athlete, 10));

			await UserService.setSmsNotificationStatus(currentUser, req?.body?.is_sms_enabled);

			res.status(HttpStatusCodes.ACCEPTED).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}

}
