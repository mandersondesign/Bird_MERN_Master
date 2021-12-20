import {EntityRepository, Repository} from 'typeorm';
import FCMToken from '../../models/user/fcm_token';

@EntityRepository(FCMToken)
export default class FCMTokenRepository extends Repository<FCMToken> {
	public addToken(userId: number, sessionId: number, token: string) {
		return this.save({
			userId,
			sessionId,
			token,
		});
	}

	public removeToken(token: string) {
		return this.delete({
			token,
		});
	}

	public removeTokenBySessionId(sessionId: number) {
		return this.delete({
			sessionId,
		});
	}

	public findBySessionId(sessionId: number): Promise<FCMToken> {
		return this.findOne({
			where: {
				sessionId,
			},
		});
	}

	public findByUserId(userId: number): Promise<FCMToken[]> {
		return this.find({
			where: {
				userId,
			},
		});
	}
}
