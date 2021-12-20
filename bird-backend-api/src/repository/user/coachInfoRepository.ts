import {EntityRepository, Repository} from 'typeorm';
import CoachInfo from '../../models/user/coach_info';

@EntityRepository(CoachInfo)
export default class CoachInfoRepository extends Repository<CoachInfo> {
	public findById(userId: number): Promise<CoachInfo> {
		return this.findOne({
			where: { userId },
		});
	}

	public add(userId: number, { about, specialties }) {
		const _specialties = (specialties || []).reduce((sum, cur, index) => index ? `${sum}, "${cur}"` : sum, `"${specialties[0]}"`);

		return this.save({
			userId,
			about,
			specialties: [`{${_specialties}}`],
			onboardingStep: 2,
		});
	}

	public updateInfo(userId: number, { about, specialties }) {
		const _specialties = (specialties || []).reduce((sum, cur, index) => index ? `${sum}, "${cur}"` : sum, `"${specialties[0]}"`);

		return this.update(userId, {
			about,
			specialties: [`{${_specialties}}`],
		});
	}

	public addMeasurement(userId: number, measurementId) {
		return this.save({
			userId,
			measurementId,
		});
	}

	public updateMeasurement(userId: number, measurementId) {
		return this.update(userId, {
			measurementId
		});
	}

	public setOnboardingStep(userId: number, onboardingStep: number) {
		return this.update(userId, {
			onboardingStep,
		});
	}

	public setCustomQuestions(userId: number, customQuestions: string[]) {
		return this.update(userId, {
			customQuestions: customQuestions ? [`{${customQuestions}}`] : null,
		});
	}
}
