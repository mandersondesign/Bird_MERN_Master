import {EntityRepository, Repository} from 'typeorm';
import Invite from '../../models/user/invite';

@EntityRepository(Invite)
export default class InviteRepository extends Repository<Invite> {
	public add(fromId: number, toId: number, isAccepted = false, fletfeetEventId? : number) {
		return this.save({
			fromId,
			toId,
			isAccepted,
			fletfeetEventId,
		});
	}

	public findById(inviteId: number): Promise<Invite> {
		return this.findOne({
			where: { inviteId },
		});
	}

	public findByAthleteId(toId: number): Promise<Invite> {
		return this.findOne({
			where: { toId },
			relations: ['to', 'from', 'from.coachInfo'],
		});
	}

	public accept(inviteId: number) {
		return this.update(inviteId, {
			isAccepted: true,
		});
	}

	public deleteByAthleteId(toId: number) {
		return this.delete({
			toId
		});
	}
}
