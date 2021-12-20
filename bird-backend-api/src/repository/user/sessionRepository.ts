import {EntityRepository, Repository} from 'typeorm';
import Session from '../../models/user/session';

@EntityRepository(Session)
export default class SessionRepository extends Repository<Session> {
	public addSession(userId: number, lastUserIp: string) {
		return this.save({
			userId,
			isActive: true,
			lastUserIp,
		});
	}

	public cancelSession(sessionId) {
		return this.update(sessionId, {
			isActive: false,
		});
	}

	public findById(sessionId: number): Promise<Session> {
		return this.findOne({
			where: { sessionId },
		});
	}
}
