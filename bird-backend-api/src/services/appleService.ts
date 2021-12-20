import { getConnection } from 'typeorm';
import User from '../models/user/user';
import Program from '../models/plan/program';
import ApplicationError from '../errors/applicationError';
import UserRepository from '../repository/user/userRepository';
import PlanRepository from '../repository/plan/planRepository';
import OrderRepository from '../repository/subscription/orderRepository';
import InviteRepository from '../repository/user/inviteRepository';
import ActiveCampaignService from './activeCampaignService';
import PlanService from './planService';

export default class AppleService {

	public static async savePayment(user: User, program: Program, coupon?: string, appleTransactionId?: string, appleTransactionPayload?: any) {
		const coach = await getConnection().transaction(async (entityManager) => {
			const userRepository: UserRepository = entityManager.getCustomRepository(UserRepository);
			const orderRepository: OrderRepository = entityManager.getCustomRepository(OrderRepository);
			const planRepository: PlanRepository = entityManager.getCustomRepository(PlanRepository);
			const inviteRepository: InviteRepository = entityManager.getCustomRepository(InviteRepository);

			try {
				await orderRepository.add({
					userId: user.userId,
					programId: program.programId,
					amount: Math.ceil((Number(program.price)) * 100),
					date: new Date(),
					appleTransactionId,
					appleTransactionPayload
				});

				const currentCoach = await userRepository.findCoachById(program.planTemplate.coachId);

				await userRepository.moveToPaidUser(user.userId);
				await planRepository.moveAthletePlansToCoach(user.userId, currentCoach.userId);
				await inviteRepository.deleteByAthleteId(user.userId);

				return currentCoach;
			} catch (err) {
				console.log(err);
				throw new ApplicationError(err.message);
			}
		});

		await PlanService.setPlan(coach, {
			athleteId: user.userId,
			planTemplateId: program.planTemplateId,
			date: program.startDate,
			minMilesPerWeek: null,
			maxMilesPerWeek: null
		});

		const eventName = 'Purchased';
		const eventData = `Program: ${program.alias}`;
		await ActiveCampaignService.triggerEvent(eventName, eventData, user.email);

		return { };
	}

	public static async checkPayment(user: User, program: Program) {
		await getConnection().transaction(async (entityManager) => {
			const orderRepository: OrderRepository = entityManager.getCustomRepository(OrderRepository);

			try {
				const order = await orderRepository.findByProgramId(user.userId, program.programId);

				return;
			} catch (err) {
				console.log(err);
				throw new ApplicationError(err.message);
			}
		});
	}
}
