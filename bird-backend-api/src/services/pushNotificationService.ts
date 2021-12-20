import ApplicationError from '../errors/applicationError';
import fetch from 'node-fetch';
import { getConnection } from 'typeorm';
import env from '../env';
import FCMToken from '../models/user/fcm_token';
import FCMTokenRepository from '../repository/user/fcmTokenRepository';
import User from '../models/user/user';
import to from 'await-to-js';

export default class PushNotificationService {

	public static NOTIFICATION_TYPES = {
		WORKOUT_STRAVA: 1,
		WORKOUT_CARD: 2,
		WEEK_CARD: 3,
		CHAT_TAG: 4,
		CHAT_REACTION: 5,
		WEEK_CARD_NEXT: 6,
		WORKOUT_DETAILS: 7,
		PLAN_JOIN: 8,
	};

	public static async addToken(userId: number, sessionId: number, token: string) : Promise<FCMToken>{
		if (!token) {
			throw new ApplicationError('Token is required');
		}

		const fcmTokenRepository: FCMTokenRepository = getConnection().getCustomRepository(FCMTokenRepository);
		return fcmTokenRepository.addToken(userId, sessionId, token);
	}

	public static async findBySessionId(sessionId: number) : Promise<FCMToken>{
		const fcmTokenRepository: FCMTokenRepository = getConnection().getCustomRepository(FCMTokenRepository);
		return fcmTokenRepository.findBySessionId(sessionId);
	}

	public static async removeToken(token: string) : Promise<any>{
		const fcmTokenRepository: FCMTokenRepository = getConnection().getCustomRepository(FCMTokenRepository);
		return fcmTokenRepository.removeToken(token);
	}

	public static async sendToUser(userId: number, { title, body, workoutId, typeId }, data?) {

		const fcmTokenRepository: FCMTokenRepository = getConnection().getCustomRepository(FCMTokenRepository);
		const fcmTokens = await fcmTokenRepository.findByUserId(userId);

		if (!fcmTokens || fcmTokens.length === 0) {
			return;
		}

		const registrationIds = fcmTokens.map((t) => t.token);

		await fetch('https://fcm.googleapis.com/fcm/send', {
			method: 'post',
			body: JSON.stringify({
				registration_ids: registrationIds, // eslint-disable-line
				notification: {
					title,
					body,
					sound: 'default',
				},
				data: data ? data : {
					workout_id: workoutId, // eslint-disable-line
					type_id: typeId, // eslint-disable-line
				},
				content_available: true, // eslint-disable-line
				priority: 10
			}),
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `key=${env.FCM_KEY}`,
			},
		});

	}

	public static async sendPushFromChat(currentUser: User, { action, toUserIds, channelUrl, channelName, messageId, messageText }) : Promise<any>{
		for (const toUserId of toUserIds) {
			switch (action) {
				case 'tag':
					await to(PushNotificationService.sendToUser(toUserId, {
						title: `Hey! ${currentUser.firstName} tagged you in ${channelName}`,
						body: messageText,
						workoutId: null,
						typeId: PushNotificationService.NOTIFICATION_TYPES.CHAT_TAG,
					}, {
						channel_url: channelUrl, // eslint-disable-line
						message_id: messageId, // eslint-disable-line
						msg_id: messageId, // eslint-disable-line
						type_id: PushNotificationService.NOTIFICATION_TYPES.CHAT_TAG, // eslint-disable-line
					}));
					break;
				case 'reaction':
					await to(PushNotificationService.sendToUser(toUserId, {
						title: 'You\'ve got reactions!',
						body: `🥰 You've got reactions to your comment in ${channelName}. Thanks, team!`,
						workoutId: null,
						typeId: PushNotificationService.NOTIFICATION_TYPES.CHAT_REACTION,
					}, {
						channel_url: channelUrl, // eslint-disable-line
						message_id: messageId, // eslint-disable-line
						msg_id: messageId, // eslint-disable-line
						type_id: PushNotificationService.NOTIFICATION_TYPES.CHAT_REACTION, // eslint-disable-line
					}));
					break;
				default:
					throw new ApplicationError('Wrong action type');
			}
		}
	}
}
