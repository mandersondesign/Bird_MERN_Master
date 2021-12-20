
import * as HttpStatusCodes from 'http-status-codes';
import Event from '../models/event/event';
import ApplicationError from '../errors/applicationError';
import UserType from '../models/user/user_type';
import PlanRepository from '../repository/plan/planRepository';
import PlanWeekRepository from '../repository/plan/planWeekRepository';
import WorkoutRepository from '../repository/plan/workoutRepository';
import PlanTemplateRepository from '../repository/plan/planTemplateRepository';
import PlanPhaseTemplateRepository from '../repository/plan/planPhaseTemplateRepository';
import PlanWeekTemplateRepository from '../repository/plan/planWeekTemplateRepository';
import WorkoutTemplateRepository from '../repository/plan/workoutTemplateRepository';
import { getConnection } from 'typeorm';
import PlanTemplate from '../models/plan/plan_template';
import Plan from '../models/plan/plan';
import WorkoutService from './workoutService';
import PlanWeek from '../models/plan/plan_week';
import UserService from './userService';
import AthleteService from './athleteService';
import IPlanMeta from '../interfaces/IPlanMeta';
import WorkoutStatus from '../models/plan/workout_status';
import User from '../models/user/user';
import LastActivityRepository from '../repository/user/lastActivityRepository';
import LastActivityType from '../models/user/last_activity_type';
import WorkoutType from '../models/plan/workout_type';
import UserPaceRepository from '../repository/plan/userPaceRepository';
import Pace from '../models/plan/pace';
import Mail from '../utils/mail';
import to from 'await-to-js';
import * as fs from 'fs';
import env from '../env';
import AppConfig from '../models/app/config';
import PlanPhaseTemplate from '../models/plan/plan_phase_template';
import PlanPhaseRepository from '../repository/plan/planPhaseRepository';
import CoachPlanToUserRepository from '../repository/subscription/coachPlanToUserRepository';
import UserRepository from '../repository/user/userRepository';
import WorkoutTypeRepository from '../repository/plan/workoutTypeRepository';
import CoachInfoRepository from '../repository/user/coachInfoRepository';
import CoachInfo from '../models/user/coach_info';
import timeString from '../utils/timeString';
import PushNotificationService from './pushNotificationService';
import ProgramRepository from '../repository/plan/programRepository';

const MAX_DISTANCE = 100;

const client = require('twilio')(env.TWILIO_SID, env.TWILIO_TOKEN); // eslint-disable-line

export default class PlanService {

	public static async getRecommendedPlan(currentUser, {
		eventId,
		pastExperienceId,
		milesPerWeekId,
		longDistanceId,
	}) {
		if (currentUser.userTypeId !== UserType.ATHLETE) {
			throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
		}

		// BIRD-202 Plan Template Selection Logic

		let planTemplateId;

		if (eventId === Event.K10) {
			planTemplateId = 6; // eslint-disable-line
		}

		if (eventId === Event.HALF_MARATHON) {
			/* eslint-disable */

			// take minimum
			if (pastExperienceId === 1 || pastExperienceId === 2
				|| milesPerWeekId === 1 || milesPerWeekId === 2
				|| longDistanceId === 1 || longDistanceId === 2) {
				planTemplateId = 1;
			} else {
				planTemplateId = 2;
			}
			/* eslint-enable */
		}

		if (eventId === Event.MARATHON) {
			if (pastExperienceId === 1 || milesPerWeekId === 1 || longDistanceId === 1) {
				planTemplateId = 3; // eslint-disable-line
			} else if (pastExperienceId === 2 || milesPerWeekId === 2 || longDistanceId === 2) { // eslint-disable-line
				planTemplateId = 4; // eslint-disable-line
			} else if (pastExperienceId === 3 || milesPerWeekId === 3 || longDistanceId === 3) { // eslint-disable-line
				planTemplateId = 5; // eslint-disable-line
			}
		}

		if (!planTemplateId) {
			throw new ApplicationError('Plan not found', HttpStatusCodes.NOT_FOUND);
		}

		const planTemplateRepository: PlanTemplateRepository = getConnection().getCustomRepository(PlanTemplateRepository);
		const planTemplate = await planTemplateRepository.findById(planTemplateId);
		const daysPerWeek = await planTemplateRepository.getDaysPerWeek(planTemplateId);
		const amountOfWeek = await planTemplateRepository.getAmoutOfWeek(planTemplateId);

		return {
			planTemplateId,
			planName: planTemplate.name,
			amountOfWeek,
			daysPerWeek,
		};
	}

	public static async getWeeksMilesData(currentUser: User, userAlias: number | 'me') {
		const userId = userAlias === 'me' ? currentUser.userId : Number(userAlias);

		const planRepository: PlanRepository = getConnection().getCustomRepository(PlanRepository);
		const userPlan: Plan = await planRepository.getLastPlanByAthlete(userId);

		if (!userPlan) {
			throw new ApplicationError('Plan not found', HttpStatusCodes.NOT_FOUND);
		}

		if (currentUser.userTypeId === UserType.COACH) {
			if (userPlan.coachId !== currentUser.userId) {
				throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
			}
		} else if (currentUser.userTypeId === UserType.ATHLETE) {
			if (currentUser.userId !== userId) {
				throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
			}
		}

		const data = await planRepository.getMilesPerWeeks(userPlan.planId);

		return data;
	}

	public static async getWeeksMilesCompletedData(currentUser: User, userAlias: number | 'me') {
		const userId = userAlias === 'me' ? currentUser.userId : Number(userAlias);

		const planRepository: PlanRepository = getConnection().getCustomRepository(PlanRepository);
		const fullPlan = await planRepository.getFullPlanByAthlete(userId, false);

		if (!fullPlan) {
			throw new ApplicationError('Plan not found', HttpStatusCodes.NOT_FOUND);
		}

		if (currentUser.userTypeId === UserType.COACH) {
			if (fullPlan.coachId !== currentUser.userId) {
				throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
			}
		} else if (currentUser.userTypeId === UserType.ATHLETE) {
			if (currentUser.userId !== userId) {
				throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
			}
		}

		const { numberOfCurrentWeek } = this._getCurrentWeekAndPhase(fullPlan);
		const data = await planRepository.getCompletedMilesPerWeeks(fullPlan.planId, numberOfCurrentWeek);

		return data;
	}

	public static async getDataForPlanChart(currentUser: User, userAlias: number | 'me') {
		const userId = userAlias === 'me' ? currentUser.userId : Number(userAlias);

		const planRepository: PlanRepository = getConnection().getCustomRepository(PlanRepository);
		const fullPlan = await planRepository.getFullPlanByAthlete(userId, false);

		if (!fullPlan) {
			throw new ApplicationError('Plan not found', HttpStatusCodes.NOT_FOUND);
		}

		if (currentUser.userTypeId === UserType.COACH) {
			if (fullPlan.coachId !== currentUser.userId) {
				throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
			}
		} else if (currentUser.userTypeId === UserType.ATHLETE) {
			if (currentUser.userId !== userId) {
				throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
			}
		}

		const weekDays = [1, 2, 3, 4, 5, 6, 7]; // eslint-disable-line
		const { numberOfCurrentWeek } = this._getCurrentWeekAndPhase(fullPlan);

		const data = [];
		const completed = [];
		for (const week of fullPlan.planWeeks) {
			for (const weekDay of weekDays) {
				const workout = (week.workouts || []).find((w) => (new Date(`${w.date}T00:00:00`).getDay() || 7) === weekDay);
				const day = weekDay + 7 * (week.numberOfWeek - 1);

				data.push({
					day,
					distance: workout ? workout.distance : 0,
					week: week.numberOfWeek,
					time: workout ? workout.time : 0,
				});

				if (week.numberOfWeek <= numberOfCurrentWeek) {
					let distance = 0;
					if (workout && workout.completedDistance) {
						distance = workout.completedDistance;
					} else if (workout && (workout.workoutStatusId === WorkoutStatus.DID_IT || workout.workoutStatusId === WorkoutStatus.PARTIALLY_DONE)) {
						distance = workout.distance;
					}

					completed.push({
						day,
						distance,
						week: week.numberOfWeek,
						time: workout ? (workout.movingTime || 0) : 0, // eslint-disable-line
					});
				}
			}
		}

		return { data, completed };
	}

	public static async getFullPlanWeekById(currentUser: User, weekId: number) {
		const planWeekRepository: PlanWeekRepository = getConnection().getCustomRepository(PlanWeekRepository);
		const planWeek = await planWeekRepository.getFullPlanWeekById(weekId);

		if (!planWeek) {
			throw new ApplicationError('Plan week not found', HttpStatusCodes.NOT_FOUND);
		}

		if (currentUser.userTypeId === UserType.COACH) {
			if (planWeek.plan.coachId !== currentUser.userId) {
				throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
			}
		} else if (currentUser.userTypeId === UserType.ATHLETE) {
			if (currentUser.userId !== planWeek.plan.athleteId) {
				throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
			}
		}

		return planWeek;
	}

	public static async getPlanByUserId(userId: number) {
		const planRepository: PlanRepository = getConnection().getCustomRepository(PlanRepository);
		const plan = await planRepository.findOne({
			where: {
				athleteId: userId,
			}
		});
		return plan;
	}

	public static async getPlanByUser(currentUser: User, userAlias: number | 'me', includeInactive: boolean) {
		const userId = userAlias === 'me' ? currentUser.userId : Number(userAlias);

		const planRepository: PlanRepository = getConnection().getCustomRepository(PlanRepository);
		const fullPlan = await planRepository.getFullPlanByAthlete(userId, includeInactive);

		if (!fullPlan) {
			throw new ApplicationError('Plan not found', HttpStatusCodes.NOT_FOUND);
		}

		if (currentUser.userTypeId === UserType.COACH) {
			if (fullPlan.coachId !== currentUser.userId) {
				throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
			}
		} else if (currentUser.userTypeId === UserType.ATHLETE) {
			if (currentUser.userId !== userId) {
				throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
			}
		}

		if (!fullPlan.planWeeks || fullPlan.planWeeks.length === 0) {
			throw new ApplicationError('Plan not completed');
		}

		const programRepository: ProgramRepository = getConnection().getCustomRepository(ProgramRepository);
		const program = await programRepository.findByPlanTemplateId(fullPlan.planTemplateId);

		if (!program) {
			// throw new ApplicationError('Program not found', HttpStatusCodes.NOT_FOUND);
		}

		const userInfo = await UserService.getUserInfo(fullPlan.athleteId);

		const phases = [];
		let sumOfMiles = 0;
		let sumOfWorkouts = 0;
		const countOfWeeks = fullPlan.planWeeks ? fullPlan.planWeeks.length : 0;
		const getMaxPlanWorkoutDate = new Date(await planRepository.getMaxPlanWorkoutDate(fullPlan.planId));
		const planEndDate = getMaxPlanWorkoutDate.setDate(getMaxPlanWorkoutDate.getDate() + 1);
		const status = (planEndDate < Date.now()) ? 'expired' : fullPlan.isActive ? 'active' : 'ended';

		let assignedMiles = 0;
		let assignedWorkouts = 0;
		let countOfCompletedMiles = 0;
		let countOfCompletedWorkouts = 0;
		let timeAssigned = 0;
		let timeCompleted = 0;

		const { numberOfCurrentWeek, numberOfCurrentPhase } = this._getCurrentWeekAndPhase(fullPlan);

		for (const week of fullPlan.planWeeks) {
			const numberOfPhase = week.numberOfPhase;
			const currentPhase = phases.find((phase) => phase.numberOfPhase === numberOfPhase);

			if (currentPhase) {
				currentPhase.weeks.push(week);
			} else {
				phases.push({
					numberOfPhase,
					name: week.phase ? week.phase.name : `Phase ${numberOfPhase}`,
					description: week.phase ? week.phase.description : '',
					weeks: [week]
				});
			}

			if (week.numberOfWeek <= numberOfCurrentWeek) {
				const completedWorkouts = (week.workouts || []).filter((workout) => (workout.workoutStatusId === WorkoutStatus.DID_IT ||
					workout.workoutStatusId === WorkoutStatus.PARTIALLY_DONE) &&
					workout.workoutTypeId !== WorkoutType.REST);

				countOfCompletedMiles = countOfCompletedMiles + completedWorkouts.reduce((sum, workout) => {
					let completedDistance = Number(workout.distance);
					if (workout.completedDistance) {
						completedDistance = Number(workout.completedDistance);
					}
					return sum + completedDistance;
				}, 0);

				countOfCompletedWorkouts = countOfCompletedWorkouts + completedWorkouts.length;
				timeCompleted = timeCompleted + (week.workouts || []).reduce((sum, workout) => sum + (workout.movingTime ? Number(workout.movingTime) : 0), 0);
				timeAssigned = timeAssigned + (week.workouts || []).reduce((sum, workout) => sum + (workout.time ? Number(workout.time) : 0), 0);

				sumOfMiles = sumOfMiles + (week.workouts ?
					week.workouts
						.reduce((sum, workout) => sum + (workout.workoutTypeId !== WorkoutType.REST ? Number(workout.distance) : 0), 0) :
					0);

				sumOfWorkouts = sumOfWorkouts + (week.workouts || [])
					.filter((workout) => workout.workoutTypeId !== WorkoutType.REST).length;

				assignedMiles = sumOfMiles;
				assignedWorkouts = sumOfWorkouts;
			}
		}

		const meta: IPlanMeta = {
			phases: {
				current: numberOfCurrentPhase,
				total: phases.length,
			},
			weeks: {
				current: numberOfCurrentWeek,
				total: countOfWeeks,
			},
			miles: {
				total: sumOfMiles,
				assigned: assignedMiles,
				ran: countOfCompletedMiles,
			},
			workouts: {
				total: sumOfWorkouts,
				assigned: assignedWorkouts,
				completed: countOfCompletedWorkouts,
			},
			goal: {
				time: userInfo ? userInfo.goalTime : null,
				type: userInfo ? userInfo.goalType : null,
			},
			time: {
				assigned: timeString(timeAssigned),
				completed: timeString(timeCompleted),
			}
		};

		return {
			plan: fullPlan,
			program,
			meta,
			phases,
			userInfo,
			planEndDate,
			status
		};
	}

	public static async setPlan(currentUser: User, {
		athleteId,
		planTemplateId,
		date,
		minMilesPerWeek,
		maxMilesPerWeek
	}) {
		return getConnection().transaction(async (entityManager) => {
			let coachId = null;
			let isPaidAthlete = false;

			const appConfigRepository = entityManager.getRepository(AppConfig);
			const planRepository: PlanRepository = entityManager.getCustomRepository(PlanRepository);

			if (currentUser.userTypeId === UserType.ATHLETE) {
				const config = await appConfigRepository.findOne();
				if (!config || !config.defaultCoachId) {
					throw new Error('No config data');
				}

				coachId = config.defaultCoachId;
			} else if (currentUser.userTypeId === UserType.COACH) {
				// TODO: validate permissions
				coachId = currentUser.userId;
				isPaidAthlete = true;

				const userRepository: UserRepository = entityManager.getCustomRepository(UserRepository);
				const coachPlanToUserRepository: CoachPlanToUserRepository = entityManager.getCustomRepository(CoachPlanToUserRepository);

				const coachPlanToUser = await coachPlanToUserRepository.getByCoachId(coachId);
				const countOfAthletes = await userRepository.getTotalActiveAthletesCount(coachId);
				const listOfCustomTemplates = await planRepository.listOfAssignedCustomPlans(currentUser.userId);
				const countOfTemplates = listOfCustomTemplates.length +
					(
						(planTemplateId <= 6 || listOfCustomTemplates.find(i => i.plan_template_id === planTemplateId)) ? 0 : 1 // eslint-disable-line
					);

				if (coachPlanToUser &&
					coachPlanToUser.coachPlan &&
					coachPlanToUser.coachPlan.maxAthletes && // not null, null == inf
					coachPlanToUser.coachPlan.maxAthletes <= countOfAthletes) {
					throw new ApplicationError('Number of athletes has reached the maximum amount');
				}

				if (coachPlanToUser &&
					coachPlanToUser.coachPlan &&
					coachPlanToUser.coachPlan.maxTemplates && // not null, null == inf
					coachPlanToUser.coachPlan.maxTemplates < countOfTemplates) {
					throw new ApplicationError('Number of custom plans has reached the maximum amount');
				}
			} else {
				throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
			}

			if (minMilesPerWeek && maxMilesPerWeek && minMilesPerWeek > maxMilesPerWeek) {
				throw new ApplicationError('Max weekly mileage cannot be less than min weekly mileage ', HttpStatusCodes.BAD_REQUEST);
			}

			if (!isPaidAthlete) {
				// validate onboarding only for free athletes
				const userInfo = await UserService.getUserInfo(athleteId);
				if (!userInfo) {
					throw new ApplicationError('This athlete has not completed onboarding yet');
				}
			}

			const planPhaseRepository: PlanPhaseRepository = entityManager.getCustomRepository(PlanPhaseRepository);
			const planWeekRepository: PlanWeekRepository = entityManager.getCustomRepository(PlanWeekRepository);
			const workoutRepository: WorkoutRepository = entityManager.getCustomRepository(WorkoutRepository);
			const planTemplateRepository: PlanTemplateRepository = entityManager.getCustomRepository(PlanTemplateRepository);
			const lastActivityRepository: LastActivityRepository = entityManager.getCustomRepository(LastActivityRepository);

			const planTemplate: PlanTemplate = await planTemplateRepository.findOne({
				where: {
					planTemplateId
				},
				relations: [
					'planPhaseTemplates',
					'planPhaseTemplates.planWeekTemplates',
					'planPhaseTemplates.planWeekTemplates.workoutTemplates'
				]
			});

			if (!planTemplate) {
				throw new ApplicationError('Plan template not found', HttpStatusCodes.NOT_FOUND);
			}

			if (!planTemplate.planPhaseTemplates || planTemplate.planPhaseTemplates.length === 0) {
				throw new ApplicationError('Plan template not ready');
			}

			let countOfWeeks = 0;
			let countOfWorkouts = 0;
			let hasEmptyWeek = false;
			for (const phase of planTemplate.planPhaseTemplates) {
				if (phase.planWeekTemplates) {
					countOfWeeks = countOfWeeks + phase.planWeekTemplates.length;
					for (const week of phase.planWeekTemplates) {
						countOfWorkouts = countOfWorkouts + week.workoutTemplates.length;
						hasEmptyWeek = hasEmptyWeek || !Boolean(week.workoutTemplates.length);
					}
				}
			}

			if (countOfWeeks === 0) {
				throw new ApplicationError('Plan template not ready');
			}

			if (countOfWorkouts === 0) {
				throw new ApplicationError('Plan template not ready');
			}

			if (hasEmptyWeek) {
				throw new ApplicationError('Each week should contain at least one workout');
			}

			// Disable all othet plans
			await planRepository.endAllPlansByUser(athleteId);

			let startDate = date ? new Date(`${date}T00:00:00`) : null;
			if (!startDate) {
				const today = new Date();
				const day = today.getDay();
				const sunday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (day === 0 ? 0 : 7) - day); // eslint-disable-line
				sunday.setDate(sunday.getDate() + 1);  // next monday

				startDate = sunday;
			}

			const workoutService = new WorkoutService();

			const plan = await planRepository.createFromTemplate(planTemplate, coachId, athleteId, startDate, minMilesPerWeek, maxMilesPerWeek, planTemplate.scheduledMessage);
			const planPhases = await planPhaseRepository.createFromTemplate(planTemplate.planPhaseTemplates);

			let planWeeks: PlanWeek[] = [];
			for (const planPhase of planPhases) {
				const planPhaseTemplate = planTemplate.planPhaseTemplates.find((item) => item.planPhaseTemplateId === planPhase.planPhaseTemplateId);
				const newPlanWeeks = await planWeekRepository.createFromTemplate(plan.planId, planPhase, planPhaseTemplate.planWeekTemplates);
				planWeeks = planWeeks.concat(newPlanWeeks);
			}

			// 8 May 2020: Is it required?
			// fix for monday
			startDate.setDate(startDate.getDate() - 1);

			for (const planWeek of planWeeks) {
				const planPhase = planPhases.find((item) => item.phaseId === planWeek.phaseId);
				const planPhaseTemplate = planTemplate.planPhaseTemplates.find((item) => item.planPhaseTemplateId === planPhase.planPhaseTemplateId);
				const planWeekTemplate = planPhaseTemplate.planWeekTemplates.find((item) => item.numberOfWeek === planWeek.numberOfWeek);

				const sumPerWeek = planWeekTemplate.workoutTemplates.reduce((sum, workout) => sum + Number(workout.distance), 0);

				if (minMilesPerWeek || maxMilesPerWeek) {
					const recovery = planWeekTemplate.workoutTemplates
						.filter((workout) => workout.workoutTypeId === WorkoutType.RECOVERY);

					const countOfRecovery = recovery ? recovery.length : 0;

					if (!countOfRecovery) {
						// do nothing
					} else if (minMilesPerWeek && sumPerWeek < minMilesPerWeek) {
						const diff = minMilesPerWeek - sumPerWeek;
						const diffPerWorkout = diff / countOfRecovery;
						recovery.map((workout) => workout.distance = Number(workout.distance) + diffPerWorkout);
					} else if (maxMilesPerWeek && sumPerWeek > maxMilesPerWeek) {
						const diff = sumPerWeek - maxMilesPerWeek;
						const diffPerWorkout = diff / countOfRecovery;
						recovery.map((workout) => workout.distance = Math.max(Number(workout.distance) - diffPerWorkout, 0));
					}
				}

				const workoutTemplates = planWeekTemplate.workoutTemplates.map((workoutTemplate) => {
					const workoutDate = workoutService.getWorkoutDateFromTemplate(
						workoutTemplate.dayNumber,
						planWeekTemplate.numberOfWeek,
						startDate
					);
					(workoutTemplate as any).date = workoutDate;

					return workoutTemplate;
				});
				await workoutRepository.createFromTemplate(planWeek, workoutTemplates);
			}

			if (currentUser.userTypeId === UserType.COACH) {
				AthleteService.sendNotificationAboutPublishPlan(currentUser, athleteId);
			}

			if (planTemplate?.pushMessage) {
				await to(PushNotificationService.sendToUser(athleteId, {
					title: planTemplate?.pushTitle || 'Hey 👋🏽',
					body: planTemplate?.pushMessage,
					workoutId: null,
					typeId: PushNotificationService.NOTIFICATION_TYPES.PLAN_JOIN,
				}, {
					channel_url: planTemplate.channelUrl, // eslint-disable-line
					type_id: PushNotificationService.NOTIFICATION_TYPES.PLAN_JOIN, // eslint-disable-line
				}));
			}

			await lastActivityRepository.set(athleteId, LastActivityType.PLAN_ASSIGNED);

			return plan;
		});
	}

	public static async getWeekByNumber(currentUser: User, userAlias: number | 'me', weekNumber: number): Promise<[PlanWeek, boolean]> {
		const userId = userAlias === 'me' ? currentUser.userId : Number(userAlias);

		const planRepository: PlanRepository = getConnection().getCustomRepository(PlanRepository);
		const planWeekRepository: PlanWeekRepository = getConnection().getCustomRepository(PlanWeekRepository);

		const fullPlan: Plan = await planRepository.getFullPlanByAthlete(userId, false);

		if (!fullPlan) {
			throw new ApplicationError('Plan not found', HttpStatusCodes.NOT_FOUND);
		}

		if (currentUser.userTypeId === UserType.COACH) {
			if (fullPlan.coachId !== currentUser.userId) {
				throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
			}
		} else if (currentUser.userTypeId === UserType.ATHLETE) {
			if (currentUser.userId !== userId) {
				throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
			}
		}

		if (!weekNumber) {
			const { numberOfCurrentWeek } = this._getCurrentWeekAndPhase(fullPlan);
			weekNumber = numberOfCurrentWeek;
		}

		const currentWeek = await planWeekRepository.getPlanWeekByNumberOfWeek(fullPlan.planId, weekNumber);

		if (!currentWeek) {
			throw new ApplicationError('Weeks not found', HttpStatusCodes.NOT_FOUND);
		}

		return [currentWeek, true];
	}

	public static async getPlanListByCoach(coachId: number) {
		const planRepository: PlanRepository = getConnection().getCustomRepository(PlanRepository);
		const plans = await planRepository.getPlanListByCoach(coachId);

		return plans;
	}

	public static async searchPlanTemplates(query: string, coachId: number): Promise<PlanTemplate[]> {
		if (!query) {
			return [];
		}

		const planTemplateRepository: PlanTemplateRepository = getConnection().getCustomRepository(PlanTemplateRepository);
		const page = 1;
		const limit = 5;
		const plans: PlanTemplate[] = await planTemplateRepository.search(coachId, page, limit, query);

		return plans;
	}

	public static async listOfTemplates(coachId): Promise<PlanTemplate[]> {
		const planTemplateRepository: PlanTemplateRepository = getConnection().getCustomRepository(PlanTemplateRepository);
		const plans = await planTemplateRepository.list(coachId);

		return plans;
	}

	public static async listOfCoachTemplates(
		coachId,
		sortField = 'last_update',
		sortType: 'ASC' | 'DESC' = 'DESC'
	): Promise<PlanTemplate[]> {
		let _sortType = sortType;
		if (sortType.toLowerCase() !== 'asc' && sortType.toLowerCase() !== 'desc') {
			_sortType = 'DESC';
		}

		let _sortField = sortField;
		if (sortField.toLowerCase() !== 'name' && sortField.toLowerCase() !== 'last_update') {
			_sortField = 'last_update';
		}
		const planTemplateRepository: PlanTemplateRepository = getConnection().getCustomRepository(PlanTemplateRepository);
		const plans = await planTemplateRepository.listByCoach(coachId, _sortField, _sortType);

		return plans;
	}

	public static async getAmountOfCoachTemplates(coachId): Promise<number> {
		const planTemplateRepository: PlanTemplateRepository = getConnection().getCustomRepository(PlanTemplateRepository);
		const amount = await planTemplateRepository.getAmountOfCoachTemplates(coachId);

		return amount;
	}

	public static async createNewTemplate(currentUser: User, name: string, scheduledMessage: string): Promise<PlanTemplate> {
		if (!name) {
			throw new ApplicationError('Name is required');
		}

		const planTemplateRepository: PlanTemplateRepository = getConnection().getCustomRepository(PlanTemplateRepository);

		let plan = await planTemplateRepository.findByName(currentUser.userId, name);
		if (plan) {
			throw new ApplicationError('Template with this name already exists');
		}

		plan = await planTemplateRepository.findByNameInSystemTemplates(name);
		if (plan) {
			throw new ApplicationError('This name is reserved for system template');
		}

		plan = await planTemplateRepository.createNewTemplate({
			coachId: currentUser.userId,
			name,
			scheduledMessage
		});

		return plan;
	}

	public static async addPhaseToTemplate(currentUser: User, planTemplateId, name: string): Promise<PlanPhaseTemplate> {
		const planTemplateRepository: PlanTemplateRepository = getConnection().getCustomRepository(PlanTemplateRepository);
		const planPhaseTemplateRepository: PlanPhaseTemplateRepository = getConnection().getCustomRepository(PlanPhaseTemplateRepository);
		const planTemplate = await planTemplateRepository.findById(planTemplateId);

		if (!planTemplate) {
			throw new ApplicationError('Plan template not found', HttpStatusCodes.NOT_FOUND);
		}

		if (planTemplate.coachId !== currentUser.userId) {
			throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
		}

		if (!name) {
			throw new ApplicationError('Name is required');
		}

		let numberOfPhase = 1;
		if (planTemplate.planPhaseTemplates && planTemplate.planPhaseTemplates.length > 0) {
			numberOfPhase = planTemplate.planPhaseTemplates[planTemplate.planPhaseTemplates.length - 1].numberOfPhase + 1;
		}

		const phase = await planPhaseTemplateRepository.addNewPhase({
			planTemplateId,
			name,
			description: '',
			numberOfPhase,
		});

		return phase;
	}

	public static async updatePhaseToTemplate(currentUser: User, planPhaseTemplateId, { name, description }): Promise<any> {
		const planPhaseTemplateRepository: PlanPhaseTemplateRepository = getConnection().getCustomRepository(PlanPhaseTemplateRepository);
		const planPhaseTemplate = await planPhaseTemplateRepository.findById(planPhaseTemplateId);

		if (!planPhaseTemplate) {
			throw new ApplicationError('Plan phase template not found', HttpStatusCodes.NOT_FOUND);
		}

		if (!name) {
			throw new ApplicationError('Name is required');
		}

		await planPhaseTemplateRepository.updateById(planPhaseTemplateId, {
			name,
			description
		});
	}

	public static async deletePhaseTemplate(currentUser: User, planPhaseTemplateId): Promise<any> {
		const planPhaseTemplateRepository: PlanPhaseTemplateRepository = getConnection().getCustomRepository(PlanPhaseTemplateRepository);
		const planPhaseTemplate = await planPhaseTemplateRepository.findById(planPhaseTemplateId);

		if (!planPhaseTemplate) {
			throw new ApplicationError('Plan phase template not found', HttpStatusCodes.NOT_FOUND);
		}

		if (planPhaseTemplate.planWeekTemplates && planPhaseTemplate.planWeekTemplates.length > 0) {
			throw new ApplicationError('Phase can not be deleted if it contains weeks');
		}

		await planPhaseTemplateRepository.deleteById(planPhaseTemplateId);
	}

	public static async addWeekToTemplate(currentUser: User, {
		planTemplateId,
		planPhaseTemplateId
	}): Promise<any> {
		return getConnection().transaction(async (entityManager) => {
			const planTemplateRepository: PlanTemplateRepository = entityManager.getCustomRepository(PlanTemplateRepository);
			const planPhaseTemplateRepository: PlanPhaseTemplateRepository = entityManager.getCustomRepository(PlanPhaseTemplateRepository);
			const planWeekTemplateRepository: PlanWeekTemplateRepository = entityManager.getCustomRepository(PlanWeekTemplateRepository);

			const planPhaseTemplate = await planPhaseTemplateRepository.findById(planPhaseTemplateId);

			if (!planPhaseTemplate) {
				throw new ApplicationError('Plan phase template not found', HttpStatusCodes.NOT_FOUND);
			}

			let planWeekTemplate = null;
			const planTemplate = await planTemplateRepository.findById(planTemplateId);

			let weekIndex = 0;
			for (const phase of planTemplate.planPhaseTemplates) {
				if (phase.planWeekTemplates) {
					for (const week of phase.planWeekTemplates) {
						weekIndex = weekIndex + 1;
						if (week.numberOfWeek !== weekIndex) {
							// update only if changed
							await planWeekTemplateRepository.updateNumberOfWeek(week.planWeekTemplateId, phase.planPhaseTemplateId, weekIndex);
						}
					}
				}

				if (Number(phase.planPhaseTemplateId) === Number(planPhaseTemplateId)) {
					weekIndex = weekIndex + 1;
					planWeekTemplate = await planWeekTemplateRepository.addWeekToTemplate(planPhaseTemplateId, weekIndex);
				}
			}

			return planWeekTemplate;
		});
	}

	public static async updatePlanTemplate(currentUser: User, planWeekTemplateId, { description }): Promise<any> {
		const planWeekTemplateRepository: PlanWeekTemplateRepository = getConnection().getCustomRepository(PlanWeekTemplateRepository);
		const planWeekTemplate = await planWeekTemplateRepository.findById(planWeekTemplateId);

		if (!planWeekTemplate) {
			throw new ApplicationError('Plan week template not found', HttpStatusCodes.NOT_FOUND);
		}

		await planWeekTemplateRepository.updateById(planWeekTemplateId, {
			description,
		});
	}

	public static async deleteWeekTemplate(currentUser: User, { planTemplateId, planWeekTemplateId }): Promise<any> {
		const planWeekTemplateRepository: PlanWeekTemplateRepository = getConnection().getCustomRepository(PlanWeekTemplateRepository);
		const workoutTemplateRepository: WorkoutTemplateRepository = getConnection().getCustomRepository(WorkoutTemplateRepository);
		const planTemplateRepository: PlanTemplateRepository = getConnection().getCustomRepository(PlanTemplateRepository);

		const planWeekTemplate = await planWeekTemplateRepository.findById(planWeekTemplateId);

		if (!planWeekTemplate) {
			throw new ApplicationError('Plan week template not found', HttpStatusCodes.NOT_FOUND);
		}

		await workoutTemplateRepository.deleteByWeekTemplateId(planWeekTemplateId);

		await planWeekTemplateRepository.deleteById(planWeekTemplateId);

		const planTemplate = await planTemplateRepository.findById(planTemplateId);

		let weekIndex = 0;
		for (const phase of planTemplate.planPhaseTemplates) {
			if (phase.planWeekTemplates) {
				for (const week of phase.planWeekTemplates) {
					weekIndex = weekIndex + 1;
					if (planWeekTemplate.planWeekTemplateId === week.planWeekTemplateId) {
						planWeekTemplate.numberOfWeek = weekIndex;
					}
					if (week.numberOfWeek !== weekIndex) {
						// update only if changed
						await planWeekTemplateRepository.updateNumberOfWeek(week.planWeekTemplateId, phase.planPhaseTemplateId, weekIndex);
					}
				}
			}
		}
	}

	public static async addWorkoutToTemplate(currentUser: User, planWeekTemplateId, {
		name,
		workoutTypeId,
		workoutTypeName = null,
		description,
		distance,
		time,
		paceId,
		dayNumber,
		scheduledMessage
	}): Promise<any> {
		const planWeekTemplateRepository: PlanWeekTemplateRepository = getConnection().getCustomRepository(PlanWeekTemplateRepository);
		const workoutTemplateRepository: WorkoutTemplateRepository = getConnection().getCustomRepository(WorkoutTemplateRepository);
		const workoutTypeRepository: WorkoutTypeRepository = getConnection().getCustomRepository(WorkoutTypeRepository);
		const planWeekTemplate = await planWeekTemplateRepository.findById(planWeekTemplateId);

		if (!planWeekTemplate) {
			throw new ApplicationError('Plan week template not found', HttpStatusCodes.NOT_FOUND);
		}

		if (planWeekTemplate.workoutTemplates) {
			const isExist = planWeekTemplate.workoutTemplates.find((wt) => Number(wt.dayNumber) === Number(dayNumber));

			if (isExist) {
				throw new ApplicationError('Current day already has a workout');
			}
		}

		if (!time && !isFinite(distance)) {
			throw new ApplicationError('Distance or time is required');
		}

		if (time && isFinite(distance)) {
			throw new ApplicationError('Please, chose distance or time');
		}

		if (distance && isNaN(Number(distance))) {
			throw new ApplicationError('Distance should be a numeric');
		}

		if (distance && Number(distance) >= MAX_DISTANCE) {
			throw new ApplicationError(`Distance should be less than ${MAX_DISTANCE} miles`);
		}

		if (time) {
			time = (Number(time.split(':')[0]) * 60 + Number(time.split(':')[1])) * 60; // eslint-disable-line
		}

		if (workoutTypeName) {
			// BIRD-1155 Create a new workout type

			if (currentUser.userTypeId !== UserType.COACH) {
				throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
			}

			let workoutType = await workoutTypeRepository.findBySystemName(workoutTypeName);
			if (workoutType) {
				throw new ApplicationError('This type is reserved for system workout types');
			}

			workoutType = await workoutTypeRepository.findByName(workoutTypeName, currentUser.userId);
			if (workoutType) {
				throw new ApplicationError('Workout of this type already exists');
			}

			workoutType = await workoutTypeRepository.add({
				name: workoutTypeName,
				coachId: currentUser.userId
			});

			workoutTypeId = workoutType.workoutTypeId;
		}

		await workoutTemplateRepository.addWorkoutToWeekTemplate(planWeekTemplateId, {
			name,
			workoutTypeId,
			description,
			distance,
			time,
			paceId,
			dayNumber,
			scheduledMessage
		});
	}

	public static async updateWorkoutTemplate(currentUser: User, workoutTemplateId, {
		name,
		workoutTypeId,
		workoutTypeName = null,
		description,
		distance,
		time,
		paceId,
		scheduledMessage,
	}): Promise<any> {
		const workoutTemplateRepository: WorkoutTemplateRepository = getConnection().getCustomRepository(WorkoutTemplateRepository);
		const workoutTypeRepository: WorkoutTypeRepository = getConnection().getCustomRepository(WorkoutTypeRepository);

		const workoutTemplate = await workoutTemplateRepository.findById(workoutTemplateId);

		if (!workoutTemplate) {
			throw new ApplicationError('Workout template not found', HttpStatusCodes.NOT_FOUND);
		}

		if (!time && !isFinite(distance)) {
			throw new ApplicationError('Distance or time is required');
		}

		if (time && isFinite(distance)) {
			throw new ApplicationError('Please, chose distance or time');
		}

		if (distance && isNaN(Number(distance))) {
			throw new ApplicationError('Distance should be a numeric');
		}

		if (distance && Number(distance) >= MAX_DISTANCE) {
			throw new ApplicationError(`Distance should be less than ${MAX_DISTANCE} miles`);
		}

		if (time) {
			time = (Number(time.split(':')[0]) * 60 + Number(time.split(':')[1])) * 60; // eslint-disable-line
		}

		if (workoutTypeName) {
			// BIRD-1155 Create a new workout type

			if (currentUser.userTypeId !== UserType.COACH) {
				throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
			}

			let workoutType = await workoutTypeRepository.findBySystemName(workoutTypeName);
			if (workoutType) {
				throw new ApplicationError('This type is reserved for system workout types');
			}

			workoutType = await workoutTypeRepository.findByName(workoutTypeName, currentUser.userId);
			if (workoutType) {
				throw new ApplicationError('Workout of this type already exists');
			}

			workoutType = await workoutTypeRepository.add({
				name: workoutTypeName,
				coachId: currentUser.userId
			});

			workoutTypeId = workoutType.workoutTypeId;
		}

		await workoutTemplateRepository.updateById(workoutTemplateId, {
			name,
			workoutTypeId,
			description,
			distance,
			time,
			paceId,
			scheduledMessage
		});
	}

	public static async deleteWorkoutTemplate(currentUser: User, workoutTemplateId): Promise<any> {
		const workoutTemplateRepository: WorkoutTemplateRepository = getConnection().getCustomRepository(WorkoutTemplateRepository);

		const workoutTemplate = await workoutTemplateRepository.findById(workoutTemplateId);

		if (!workoutTemplate) {
			throw new ApplicationError('Workout template not found', HttpStatusCodes.NOT_FOUND);
		}

		await workoutTemplateRepository.deleteById(workoutTemplateId);
	}

	public static async getPlanTemplateById(currentUser: User, planTemplateId): Promise<PlanTemplate> {
		const planTemplateRepository: PlanTemplateRepository = getConnection().getCustomRepository(PlanTemplateRepository);
		const planTemplate = await planTemplateRepository.findById(planTemplateId);

		if (!planTemplate) {
			throw new ApplicationError('Plan template not found', HttpStatusCodes.NOT_FOUND);
		}

		if (currentUser && planTemplate.coachId !== currentUser.userId) {
			throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
		}

		return planTemplate;

	}

	public static async getPlanTemplate(planTemplateId): Promise<PlanTemplate> {
		const planTemplateRepository: PlanTemplateRepository = getConnection().getCustomRepository(PlanTemplateRepository);
		const planTemplate = await planTemplateRepository.findById(planTemplateId);

		if (!planTemplate) {
			throw new ApplicationError('Plan template not found', HttpStatusCodes.NOT_FOUND);
		}

		return planTemplate;

	}

	public static async getPlansByTemplateId(planTemplateId): Promise<Plan[]> {
		const planRepository: PlanRepository = getConnection().getCustomRepository(PlanRepository);
		const plans = await planRepository.getPlansByPlanTemplateId(planTemplateId);

		return plans;

	}

	public static async updatePlanWelcomeMessage(planIds, message): Promise<any> {
		const planRepository: PlanRepository = getConnection().getCustomRepository(PlanRepository);
		const plans = await planRepository.updateWelcomeMessageByIds(planIds, message);
		return plans;
	}

	public static async deletePlanTemplateById(currentUser: User, planTemplateId): Promise<any> {
		const planTemplateRepository: PlanTemplateRepository = getConnection().getCustomRepository(PlanTemplateRepository);
		const planTemplate = await planTemplateRepository.findById(planTemplateId);

		if (!planTemplate) {
			throw new ApplicationError('Plan template not found', HttpStatusCodes.NOT_FOUND);
		}

		if (planTemplate.coachId !== currentUser.userId) {
			throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
		}

		await planTemplateRepository.deleteById(planTemplateId);

	}

	public static async updatePlanTemplateById(currentUser: User, planTemplateId: number, name: string, scheduledMessage: string): Promise<any> {
		const planTemplateRepository: PlanTemplateRepository = getConnection().getCustomRepository(PlanTemplateRepository);
		const planTemplate = await planTemplateRepository.findById(planTemplateId);

		if (!planTemplate) {
			throw new ApplicationError('Plan template not found', HttpStatusCodes.NOT_FOUND);
		}

		if (planTemplate.coachId !== currentUser.userId) {
			throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
		}

		let planWithThisName = await planTemplateRepository.findByName(currentUser.userId, name);
		if (planWithThisName && planWithThisName.planTemplateId !== planTemplateId) {
			throw new ApplicationError('Template with this name already exists');
		}

		planWithThisName = await planTemplateRepository.findByNameInSystemTemplates(name);
		if (planWithThisName) {
			throw new ApplicationError('This name is reserved for system template');
		}

		await planTemplateRepository.updateById(planTemplateId, {
			name,
			scheduledMessage
		});

	}

	public static async updateSortInTemplate(currentUser: User, planTemplateId: number, phases: any): Promise<any> {
		return getConnection().transaction(async (entityManager) => {
			const planTemplateRepository: PlanTemplateRepository = entityManager.getCustomRepository(PlanTemplateRepository);
			const planPhaseTemplateRepository: PlanPhaseTemplateRepository = entityManager.getCustomRepository(PlanPhaseTemplateRepository);
			const planWeekTemplateRepository: PlanWeekTemplateRepository = entityManager.getCustomRepository(PlanWeekTemplateRepository);

			const planTemplate = await planTemplateRepository.findById(planTemplateId);

			if (!planTemplate) {
				throw new ApplicationError('Plan template not found', HttpStatusCodes.NOT_FOUND);
			}

			if (planTemplate.coachId !== currentUser.userId) {
				throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
			}

			let numberOfWeek = 0;
			for (const phase of phases) {
				await planPhaseTemplateRepository.updateNumberOfPhase(phase.plan_phase_template_id, Number(phase.number_of_phase));

				if (phase.plan_week_templates) {
					for (const week of phase.plan_week_templates) {
						numberOfWeek = numberOfWeek + 1;
						await planWeekTemplateRepository.updateNumberOfWeek(week.plan_week_template_id, phase.plan_phase_template_id, numberOfWeek);
					}
				}
			}
		});
	}

	public static async updateSortInPlan(currentUser: User, planId: number, phases: any): Promise<any> {
		return getConnection().transaction(async (entityManager) => {
			const planRepository: PlanRepository = entityManager.getCustomRepository(PlanRepository);
			const planWeekRepository: PlanWeekRepository = entityManager.getCustomRepository(PlanWeekRepository);
			const workoutRepository: WorkoutRepository = entityManager.getCustomRepository(WorkoutRepository);

			const plan = await planRepository.getFullPlanById(planId);

			if (!plan) {
				throw new ApplicationError('Plan not found', HttpStatusCodes.NOT_FOUND);
			}

			if (plan.coachId !== currentUser.userId) {
				throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
			}

			const startDate: string = plan.startDate.toLocaleString('en-US').split(',')[0];
			const fistDayOfPlan = PlanService.getMondayOfCurrentWeek(new Date(`${startDate}T00:00:00`), false); // monday

			for (const phase of phases) {
				if (phase.weeks) {
					for (const week of phase.weeks) {

						const pw = plan.planWeeks.find((w) => w.planWeekId === week.week_id);
						if (pw && (pw.numberOfWeek !== week.number_of_week || pw.numberOfPhase !== phase.phase_number)) {
							await planWeekRepository.updateNumberOfWeek(week.week_id, phase.phase_number, week.number_of_week);

							const date = new Date(fistDayOfPlan.getTime());
							date.setDate(date.getDate() + 7 * (week.number_of_week - 1)); // monday
							for (const workout of pw.workouts) {
								const d = new Date(date.getTime());
								d.setDate(d.getDate() + (((new Date(`${workout.date}T00:00:00`)).getDay() + 6) % 7)); // eslint-disable-line
								await workoutRepository.updateDate(workout.workoutId, d);
							}
						}
					}
				}
			}
		});
	}

	public static async updateSortInWeek(currentUser: User, weekId: number, workouts: any): Promise<any> {
		return getConnection().transaction(async (entityManager) => {
			const planWeekRepository: PlanWeekRepository = entityManager.getCustomRepository(PlanWeekRepository);
			const workoutRepository: WorkoutRepository = entityManager.getCustomRepository(WorkoutRepository);

			const week = await planWeekRepository.getById(weekId);
			if (!week) {
				throw new ApplicationError('Week not found', HttpStatusCodes.NOT_FOUND);
			}

			if (week.plan.athleteId !== currentUser.userId) {
				throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
			}

			for (const workout of workouts) {
				await workoutRepository.updateDate(workout.workout_id, new Date(`${workout.date}T00:00:00`));
			}
		});
	}

	public static async addWeekToPlan(currentUser: User, planId: number, description: string) {
		const planRepository: PlanRepository = getConnection().getCustomRepository(PlanRepository);
		const planWeekRepository: PlanWeekRepository = getConnection().getCustomRepository(PlanWeekRepository);

		const plan: Plan = await planRepository.getById(planId);

		if (!plan) {
			throw new ApplicationError('Plan not found', HttpStatusCodes.NOT_FOUND);
		}

		const lastWeek = await planWeekRepository.getLastWeekByPlanId(planId);
		if (!lastWeek) {
			throw new ApplicationError('No existing weeks', HttpStatusCodes.BAD_REQUEST);
		}

		const week = await planWeekRepository.addWeekToPlan(
			planId,
			lastWeek.phaseId,
			lastWeek.numberOfWeek + 1,
			lastWeek.numberOfPhase,
			description
		);

		return week;
	}

	public static async deleteWeek(currentUser: User, planId: number, weekId: number): Promise<any> {
		return getConnection().transaction(async (entityManager) => {
			const planRepository: PlanRepository = entityManager.getCustomRepository(PlanRepository);
			const planWeekRepository: PlanWeekRepository = entityManager.getCustomRepository(PlanWeekRepository);
			const workoutRepository: WorkoutRepository = entityManager.getCustomRepository(WorkoutRepository);

			let plan = await planRepository.getFullPlanById(planId);

			if (!plan) {
				throw new ApplicationError('Plan not found', HttpStatusCodes.NOT_FOUND);
			}

			if (plan.coachId !== currentUser.userId) {
				throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
			}

			const { numberOfCurrentWeek } = this._getCurrentWeekAndPhase(plan);

			const targetWeek = plan.planWeeks.find((w) => w.planWeekId === Number(weekId));
			if (targetWeek && numberOfCurrentWeek >= targetWeek.numberOfWeek) {
				throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
			}

			await workoutRepository.deleteByWeekId(weekId);
			await planWeekRepository.deleteById(weekId);

			plan = await planRepository.getFullPlanById(planId);

			const startDate: string = plan.startDate.toLocaleString('en-US').split(',')[0];
			const fistDayOfPlan = PlanService.getMondayOfCurrentWeek(new Date(`${startDate}T00:00:00`), false); // monday

			let weekIndex = 0;
			for (const week of plan.planWeeks) {
				weekIndex = weekIndex + 1;
				if (week.numberOfWeek !== weekIndex) {
					await planWeekRepository.updateNumberOfWeek(week.planWeekId, week.numberOfPhase, weekIndex);

					const date = new Date(fistDayOfPlan.getTime());
					date.setDate(date.getDate() + 7 * (weekIndex - 1)); // monday
					for (const workout of week.workouts) {
						const d = new Date(date.getTime());
						d.setDate(d.getDate() + (((new Date(`${workout.date}T00:00:00`)).getDay() + 6) % 7)); // eslint-disable-line
						await workoutRepository.updateDate(workout.workoutId, d);
					}
				}
			}
		});
	}

	public static async copyWeek(currentUser: User, planId: number, weekId: number): Promise<any> {
		return getConnection().transaction(async (entityManager) => {
			const planRepository: PlanRepository = entityManager.getCustomRepository(PlanRepository);
			const planWeekRepository: PlanWeekRepository = entityManager.getCustomRepository(PlanWeekRepository);
			const workoutRepository: WorkoutRepository = entityManager.getCustomRepository(WorkoutRepository);

			const plan = await planRepository.getFullPlanById(planId);

			if (!plan) {
				throw new ApplicationError('Plan not found', HttpStatusCodes.NOT_FOUND);
			}

			if (plan.coachId !== currentUser.userId) {
				throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
			}

			const startDate: string = plan.startDate.toLocaleString('en-US').split(',')[0];

			const targetWeek = plan.planWeeks.find((w) => w.planWeekId === Number(weekId));
			const lastWeek = await planWeekRepository.getLastWeekByPlanId(planId);
			const newWeek = await planWeekRepository.addWeekToPlan(planId, lastWeek.phaseId, lastWeek.numberOfWeek + 1, lastWeek.numberOfPhase, targetWeek.description);

			for (const workout of targetWeek.workouts) {
				const date = PlanService.getMondayOfCustomWeek(new Date(`${startDate}T00:00:00`), newWeek.numberOfWeek, 0);
				if (date.getDay() === 0) {
					// sunday
					date.setDate(date.getDate() + 1);
				}
				date.setDate(date.getDate() + (((new Date(`${workout.date}T00:00:00`)).getDay() + 6) % 7)); // eslint-disable-line

				await workoutRepository.createWithoutTemplte({
					planWeekId: newWeek.planWeekId,
					name: workout.name,
					workoutTypeId: workout.workoutTypeId,
					description: workout.description,
					distance: workout.distance,
					time: workout.time,
					paceId: workout.paceId,
					date,
					isMarkedAsKey: workout.isMarkedAsKey,
					scheduledMessage: workout.scheduledMessage
				});
			}

			return newWeek;
		});
	}

	public static async getWeekById(currentUser: User, weekId: number) {
		const planWeekRepository: PlanWeekRepository = getConnection().getCustomRepository(PlanWeekRepository);

		const week = await planWeekRepository.getById(weekId);
		if (!week) {
			throw new ApplicationError('Week not found', HttpStatusCodes.NOT_FOUND);
		}

		return week;
	}

	public static async updateWeekById(currentUser: User, weekId: number, description: string) {
		const planWeekRepository: PlanWeekRepository = getConnection().getCustomRepository(PlanWeekRepository);

		const week = await planWeekRepository.getById(weekId);
		if (!week) {
			throw new ApplicationError('Week not found', HttpStatusCodes.NOT_FOUND);
		}

		await planWeekRepository.updateById(weekId, { description });

		return week;
	}

	public static async getPacesByPlanId(currentUser: User, planId: number) {
		const userPaceRepository: UserPaceRepository = getConnection().getCustomRepository(UserPaceRepository);

		let paces = await userPaceRepository.findByPlanId(planId);

		let coachId;
		if (currentUser.userTypeId === UserType.COACH) {
			coachId = currentUser.userId;
		} else if (currentUser.userTypeId === UserType.ATHLETE) {
			const coach = await UserService.getMyCoach(currentUser);
			coachId = coach.userId;
		}

		if (coachId) {
			const coachInfoRepository: CoachInfoRepository = getConnection().getCustomRepository(CoachInfoRepository);
			const coachInfo = await coachInfoRepository.findById(coachId);

			if (coachInfo && coachInfo.measurementId === CoachInfo.MEASUREMENT_ID_KM) {
				paces = paces.map((p) => {
					p.pace.name = (p.pace.name || '').replace('Mile', 'Kilometer');
					p.pace.description = (p.pace.description || '').replace('Mile', 'Kilometer').replace('mile', 'kilometer');
					return p;
				});
			}
		}

		return paces;
	}

	public static async updateWorkoutTemplateMessageById(workoutTemplateId, message) {
		const workoutTemplateRepository : WorkoutTemplateRepository = await getConnection().getCustomRepository(WorkoutTemplateRepository);
		const workout = await workoutTemplateRepository.updateWorkoutTemplateMessageById(workoutTemplateId, message);
		return workout;
	}

	public static async updatePacesByPlanId(currentUser: User, planId: number, paces) {
		return getConnection().transaction(async (entityManager) => {

			const userPaceRepository: UserPaceRepository = entityManager.getCustomRepository(UserPaceRepository);

			if (paces === null || typeof paces[Symbol.iterator] !== 'function') {
				throw new ApplicationError('Wrong paces param');
			}

			const existingPaces = await userPaceRepository.findByPlanId(planId);

			for (const pace of paces) {
				const existingPace = existingPaces.find((p) => p.paceId === Number(pace.pace_id));
				if (existingPace) {
					await userPaceRepository.updateOnePace(existingPace.userPaceId, {
						value: pace.value
					});
				} else {
					await userPaceRepository.createOnePace({
						planId,
						paceId: pace.pace_id,
						value: pace.value
					});
				}
			}
		});
	}

	public static async listOfPaces() {
		const paceRepository = getConnection().getRepository(Pace);
		const paces = await paceRepository.find();

		return paces;
	}

	public static async sendNotificationToCoachAboutExpiredPlan(coachEmail, coachName, athletes) {

		let content = fs.readFileSync('src/emails/email_template_without_button.html', 'utf8');
		content = content.replace(/{{TITLE}}/g, 'It\'s time to publish your athletes training plans');
		content = content.replace('{{TEXT}}', `
			Hi ${coachName}, 
			<br/>
			<br/>
			This is a friendly reminder that some of your athletes need next week's training plans published:
			<br/>
			<br/>
			${athletes.map(a => `${a.athlete_first_name} ${a.athlete_last_name}`).join(',<br/>')}
			<br/>
			<br/>
			An athlete's upcoming week is normally visible as of Sunday night in the Bird app.
			If you don't publish tonight, we'll send these athletes a note saying that you're still working on their plans.
			<br/>
			<br/>
			You can publish their plans one at a time or in a batch from your coach dashboard. Let us know if you have any questions at help@bird.coach.
		`);
		content = content.replace(/{{FOOTER_TEXT}}/g, 'The Bird Team');

		const [err] = await to(Mail.sendMail(coachEmail, 'It\'s time to publish your athletes training plans', content, 'Bird<hello@bird.coach>'));

		if (err) {
			throw err;
		}
	}

	public static async endPlanById(currentUser: User, planId: number) {
		const planRepository: PlanRepository = getConnection().getCustomRepository(PlanRepository);
		const lastActivityRepository: LastActivityRepository = getConnection().getCustomRepository(LastActivityRepository);

		const plan: Plan = await planRepository.getById(planId);

		if (!plan) {
			throw new ApplicationError('Plan not found', HttpStatusCodes.NOT_FOUND);
		}

		if (currentUser.userTypeId === UserType.COACH) {
			if (currentUser.userId !== plan.coachId) {
				throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
			}
		} else if (currentUser.userTypeId === UserType.ATHLETE) {
			if (currentUser.userId !== plan.athleteId) {
				throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
			}
		}

		await planRepository.endPlan(planId);
		await lastActivityRepository.set(plan.athleteId, LastActivityType.PLAN_ENDED);
	}

	public static getMondayOfCurrentWeek(date: Date, withShift = true) {
		const day = date.getDay();
		const d = new Date(date.getFullYear(), date.getMonth(), date.getDate() + (day === 0 ? -6 : 1) - day, 0, 0, 0); // eslint-disable-line

		if (withShift) {
			return new Date(d.setHours(d.getHours() - 7));
		}

		return d;
	}

	public static getSundayOfCurrentWeek(date: Date, withShift = true) {
		const day = date.getDay();
		const d = new Date(date.getFullYear(), date.getMonth(), date.getDate() + (day === 0 ? 0 : 7) - day, 24, 0, 0); // eslint-disable-line

		if (withShift) {
			return new Date(d.setHours(d.getHours() - 7));
		}

		return d;
	}

	public static getMondayOfCustomWeek(startDate: Date, numberOfWeek: number, h = 24) { // eslint-disable-line
		const day = startDate.getDay();
		const d = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + (day === 0 ? -6 : 1) - day, h, 0, 0); // eslint-disable-line

		return new Date(d.setDate(d.getDate() + (numberOfWeek - 1) * 7));
	}

	public static async copyPlanTemplate(planTemplateId: number, newCoachId: number) {
		return getConnection().transaction(async (entityManager) => {
			const planTemplateRepository: PlanTemplateRepository = entityManager.getCustomRepository(PlanTemplateRepository);
			const planPhaseTemplateRepository: PlanPhaseTemplateRepository = entityManager.getCustomRepository(PlanPhaseTemplateRepository);
			const planWeekTemplateRepository: PlanWeekTemplateRepository = entityManager.getCustomRepository(PlanWeekTemplateRepository);
			const workoutTemplateRepository: WorkoutTemplateRepository = entityManager.getCustomRepository(WorkoutTemplateRepository);
			const userRepository: UserRepository = entityManager.getCustomRepository(UserRepository);

			const planTemplate = await planTemplateRepository.findById(planTemplateId);
			if (!planTemplate) {
				throw new ApplicationError('Plan template not found', HttpStatusCodes.NOT_FOUND);
			}

			const coach = await userRepository.findById(newCoachId);
			if (!coach) {
				throw new ApplicationError('Coach not found', HttpStatusCodes.NOT_FOUND);
			}

			const newPlanTemplate = await planTemplateRepository.createNewTemplate({
				name: planTemplate.name,
				coachId: newCoachId,
				scheduledMessage: planTemplate.scheduledMessage,
			});

			for (const planPhaseTemplate of planTemplate.planPhaseTemplates) {
				const newPlanPhaseTemplate = await planPhaseTemplateRepository.addNewPhase({
					planTemplateId: newPlanTemplate.planTemplateId,
					name: planPhaseTemplate.name,
					description: planPhaseTemplate.description,
					numberOfPhase: planPhaseTemplate.numberOfPhase,
				});

				for (const planWeekTemplate of planPhaseTemplate.planWeekTemplates) {
					const newPlanWeekTemplate = await planWeekTemplateRepository.addWeekToTemplate(
						newPlanPhaseTemplate.planPhaseTemplateId,
						planWeekTemplate.numberOfWeek,
						planWeekTemplate.description
					);

					for (const workoutTemplate of planWeekTemplate.workoutTemplates) {
						await workoutTemplateRepository.addWorkoutToWeekTemplate(newPlanWeekTemplate.planWeekTemplateId, {
							name: workoutTemplate.name,
							description: workoutTemplate.description,
							distance: workoutTemplate.distance,
							dayNumber: workoutTemplate.dayNumber,
							time: workoutTemplate.time,
							paceId: workoutTemplate.paceId,
							workoutTypeId: workoutTemplate.workoutTypeId,
							scheduledMessage: workoutTemplate.scheduledMessage,
						});
					}
				}
			}
		});
	}

	public static async getPlanById(planId) {
		const planRepository: PlanRepository = getConnection().getCustomRepository(PlanRepository);
		return await planRepository.getById(planId);
	}

	private static _getCurrentWeekAndPhase(plan: Plan) {
		const now = new Date();
		const startDate = plan.startDate;

		const fistDayOfPlan = PlanService.getMondayOfCurrentWeek(new Date(`${startDate}T00:00:00`), false);
		const lastDayOfFirstWeek = PlanService.getSundayOfCurrentWeek(new Date(`${startDate}T00:00:00`), false);
		const lastDayOfPlan = lastDayOfFirstWeek;
		lastDayOfPlan.setDate(lastDayOfPlan.getDate() + (plan.planWeeks.length - 1) * 7 - 1); // eslint-disable-line

		if (now < fistDayOfPlan || now < startDate) {
			return {
				isZeroWeek: true,
				numberOfCurrentWeek: 1,
				numberOfCurrentPhase: 1,
			};
		}

		if (now > lastDayOfPlan) {
			const lastWeek = plan.planWeeks[plan.planWeeks.length - 1];
			return {
				isZeroWeek: false,
				numberOfCurrentWeek: lastWeek.numberOfWeek,
				numberOfCurrentPhase: lastWeek.numberOfPhase,
			};
		}

		const firstDayOfCurrentWeek = PlanService.getMondayOfCurrentWeek(now, false);
		const diff = PlanService.weeksBetween(fistDayOfPlan, firstDayOfCurrentWeek);
		const week = plan.planWeeks[diff] || plan.planWeeks.find((w) => w.numberOfWeek === diff + 1);

		if (!week) {
			return {
				isZeroWeek: false,
				numberOfCurrentWeek: 1,
				numberOfCurrentPhase: 1,
			};
		}

		return {
			numberOfCurrentWeek: week.numberOfWeek,
			numberOfCurrentPhase: week.numberOfPhase,
			isZeroWeek: false,
		};
	}


	// eslint-disable-next-line @typescript-eslint/member-ordering
	public static weeksBetween(d1: Date, d2: Date) {
		const diffTime = Math.abs(d1.getTime() - d2.getTime());
		return Math.round(diffTime / (1000 * 60 * 60 * 24) / 7); // eslint-disable-line
	}

	private static _groupBy(list, keyGetter) {
		const map = new Map();
		list.forEach((item) => {
			const key = keyGetter(item);
			const collection = map.get(key);
			if (!collection) {
				map.set(key, [item]);
			} else {
				collection.push(item);
			}
		});
		return map;
	}
}
