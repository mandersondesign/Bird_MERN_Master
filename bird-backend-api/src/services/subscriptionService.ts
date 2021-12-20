import { getConnection } from 'typeorm';
import User from '../models/user/user';
import CoachPlan from '../models/subscription/coach_plan';
import CoachPlanRepository from '../repository/subscription/coachPlanRepository';
import CoachPlanToUserRepository from '../repository/subscription/coachPlanToUserRepository';
import AthletePlan from '../models/subscription/athlete_plan';
import AthletePlanRepository from '../repository/subscription/athletePlanRepository';
import AthletePlanToUserRepository from '../repository/subscription/athletePlanToUserRepository';
import StripeService from './stripeService';
import ApplicationError from '../errors/applicationError';
import PlanRepository from '../repository/plan/planRepository';
import UserRepository from '../repository/user/userRepository';


export default class SubscriptionService {

	public static async listForCoach(showAll: boolean): Promise<CoachPlan[]> {
		const coachPlanRepository: CoachPlanRepository = getConnection().getCustomRepository(CoachPlanRepository);

		return coachPlanRepository.list(showAll);
	}

	public static async setPlanForCoach(coach: User, coachPlanId: number, token?: string, isAdmin = false): Promise<any> {
		const coachPlanToUserRepository: CoachPlanToUserRepository = getConnection().getCustomRepository(CoachPlanToUserRepository);
		const planRepository: PlanRepository = getConnection().getCustomRepository(PlanRepository);
		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		const coachPlanRepository: CoachPlanRepository = getConnection().getCustomRepository(CoachPlanRepository);

		const coachPlanToUser = await coachPlanToUserRepository.getByCoachId(coach.userId);
		if (coachPlanToUser && coachPlanToUser.coachPlanId === coachPlanId) {
			// do nothing;
			return null;
		}

		if (!isAdmin) {
			await userRepository.completeOnboarding(coach.userId);
		}

		const coachPlan = await coachPlanRepository.findById(coachPlanId);

		const countOfAthletes = await userRepository.getTotalActiveAthletesCount(coach.userId);
		const countOfTemplates = (await planRepository.listOfAssignedCustomPlans(coach.userId)).length;

		if (coachPlan.maxTemplates && // not null, null == inf
			coachPlan.maxTemplates < countOfTemplates) {
			if (isAdmin) {
				throw new ApplicationError('Athletes need to be removed to meet plan requirements. Please contact the coach.');
			}

			throw new ApplicationError('Please remove custom plans to meet plan requirements');
		}

		if (coachPlan.maxAthletes && // not null, null == inf
			coachPlan.maxAthletes <= countOfAthletes) {
			if (isAdmin) {
				throw new ApplicationError('Athletes need to be removed to meet plan requirements. Please contact the coach.');
			}
			throw new ApplicationError('Please remove athletes to meet plan requirements');
		}

		// Remove previous stripe subscriptions
		await StripeService.removeCoachSubscription(coach);

		let paidToDate = null;
		if (!isAdmin && (coachPlanId === CoachPlan.CORE || coachPlanId === CoachPlan.TEAM)) {
			if (token) {
				await StripeService.createCustomer(coach, token);
			}

			paidToDate = await StripeService.createSubscription(coach, coachPlanId, isAdmin);
		}

		// TODO: BIRD-926 Save old plan to history
		await coachPlanToUserRepository.set(coach.userId, coachPlanId, paidToDate);
	}

	public static async getAthleteSubscriptionPlanById(athletePlanId: number): Promise<AthletePlan> {
		const athletePlanRepository: AthletePlanRepository = getConnection().getCustomRepository(AthletePlanRepository);

		return athletePlanRepository.findById(athletePlanId);
	}

	public static async getAthleteSubscriptionPlanByCoachId(coachId: number): Promise<AthletePlan> {
		const athletePlanRepository: AthletePlanRepository = getConnection().getCustomRepository(AthletePlanRepository);

		return athletePlanRepository.findByCoachId(coachId);
	}

	public static async setSubscriptionPlanForAthlete(email: string, athletePlanId: number, token?: string): Promise<any> {
		const athletePlanToUserRepository: AthletePlanToUserRepository = getConnection().getCustomRepository(AthletePlanToUserRepository);
		const athletePlanRepository: AthletePlanRepository = getConnection().getCustomRepository(AthletePlanRepository);
		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);

		const athlete = await userRepository.findByEmail(email);
		if (!athlete) {
			throw new ApplicationError('Wrong email');
		}

		const athletePlanToUser = await athletePlanToUserRepository.getByAthleteId(athlete.userId);
		if (athletePlanToUser && athletePlanToUser.athletePlanId === athletePlanId) {
			// do nothing;
			return null;
		}

		const athletePlan = await athletePlanRepository.findById(athletePlanId);
		if (!athletePlan) {
			throw new ApplicationError('Wrong subscription plan id');
		}

		// Remove previous stripe subscriptions
		await StripeService.removeAthleteSubscription(athlete);

		let paidToDate = null;
		if (token) {
			await StripeService.createCustomer(athlete, token);
		}

		paidToDate = await StripeService.createAthleteSubscription(athlete, athletePlanId);

		// TODO: Save old plan to history
		await athletePlanToUserRepository.set(athlete.userId, athletePlanId, paidToDate);
	}
}
