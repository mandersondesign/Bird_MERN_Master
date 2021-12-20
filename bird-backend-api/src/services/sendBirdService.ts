import to from 'await-to-js';
import { getConnection } from 'typeorm';
import Mail from '../utils/mail';
import env from '../env';
import User from '../models/user/user';
import UserRepository from '../repository/user/userRepository';

const SendBird = require('sendbird-nodejs'); // eslint-disable-line
const sb = new SendBird(env.SENDBIRD_API_TOKEN, env.SENDBIRD_API_URL);

export default class SendBirdService {

	public static async sync() {
		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		const users: User[] = await userRepository.find({
			where: {
				isActive: true,
			},
			order: {
				userId: 'DESC',
			}
		});

		for (const user of users) {
			await to(sb.users.create({
				'user_id': user.userId,
				'nickname': `${user.firstName} ${user.lastName}`,
				'profile_url': user.avatar,
				'metadata': {
					'user_type_id': user.userTypeId.toString(),
					'workouts': '0', // TODO:
				}
			}));
		}
	}

	public static async create(user: User) {
		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		const count = await userRepository.getWorkoutsCount(user.userId);

		return sb.users.create({
			'user_id': user.userId,
			'nickname': `${user.firstName} ${user.lastName}`,
			'profile_url': user.avatar,
			'metadata': {
				'user_type_id': user.userTypeId.toString(),
				'workouts': count ? count.toString() : '0',
			}
		});
	}

	public static async updateName(user: User, fullName: string) {
		return sb.users.update(user.userId, {
			'nickname': fullName || `${user.firstName} ${user.lastName}`,
			'profile_url': user.avatar,
		});
	}

	public static async updateAvatar(user: User, avatarUrl: string) {
		return sb.users.update(user.userId, {
			'nickname': `${user.firstName} ${user.lastName}`,
			'profile_url': avatarUrl,
		});
	}

	public static async getMetadata(userId: number) {
		return sb.users.viewMetadata(userId);
	}

	public static async updateWorkoutsMetadata(userId: number) {
		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		const count = await userRepository.getWorkoutsCount(userId);

		let [err, res] = await to(sb.users.updateMetadata(userId, {
			metadata: {
				workouts: count ? count.toString() : '0',
			}
		}));

		if (res) {
			return res;
		}

		[err, res] = await to(sb.users.createMetadata(userId, {
			metadata: {
				workouts: count ? count.toString() : '0',
			}
		}));

		if (res) {
			return res;
		}

		throw err;
	}

	public static async syncWorkoutsMetadata() {
		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		const list = await userRepository.getAthletesWithWorkouts();

		for (const item of list) {
			console.log(item.userId, item.count);
			const [, res] = await to(sb.users.updateMetadata(item.userId, {
				metadata: {
					workouts: item.count ? item.count.toString() : '0',
				}
			}));

			if (res) {
				continue;
			}

			await to(sb.users.createMetadata(item.userId, {
				metadata: {
					workouts: item.count ? item.count.toString() : '0',
				}
			}));
		}
	}

	public static async reportWebhook(body) {
		if (body?.category !== 'message:report') {
			return null;
		}

		const link = `https://dashboard.sendbird.com/${env.SENDBIRD_API_ID}/group_channels/${body?.channel?.channel_url}/${body?.reported_message?.payload?.message_id}`;

		const content = `
		This message has been reported by the community as inappropriate with a description of <b>${body.report_description}</b>. 
		<br/>
		Message: <b>${body?.reported_message?.payload?.message}</b></br>
		Date: <b>${(new Date(body?.reported_message?.payload?.created_at).toLocaleString())}</b></br>
		Message from: <b>${body?.offending_user?.nickname}</b></br>
		<br/>
		Click <a href="${link}">here</a> to review the message.
		`;

		await to(Mail.sendMail('help@bird.coach', 'Community Chat Inappropriate Message Alert', content, 'Bird<hello@bird.coach>'));
	}
}
