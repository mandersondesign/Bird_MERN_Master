import { EntityRepository, Repository } from 'typeorm';
import RunSignupParticipant from '../../models/runsignup/participant';

@EntityRepository(RunSignupParticipant)
export default class RunSignupParticipantRepository extends Repository<RunSignupParticipant> {

	public findByRegistrationId(registrationId: number): Promise<RunSignupParticipant> {
		return this.findOne({
			where: { registrationId },
		});
	}

	public findByEmail(email: string): Promise<RunSignupParticipant> {
		return this.findOne({
			where: { email },
		});
	}
}
