import * as HttpStatusCodes from 'http-status-codes';
import WorkoutRepository from '../repository/plan/workoutRepository';
import WorkoutTypeRepository from '../repository/plan/workoutTypeRepository';
import { getConnection } from 'typeorm';
import Workout from '../models/plan/workout';
import User from '../models/user/user';
import ApplicationError from '../errors/applicationError';
import WorkoutStatus from '../models/plan/workout_status';
import LastActivityRepository from '../repository/user/lastActivityRepository';
import LastActivityType from '../models/user/last_activity_type';
import UserType from '../models/user/user_type';
import PlanRepository from '../repository/plan/planRepository';
import MessageRepository from '../repository/plan/messageRepository';
import PlanWeek from '../models/plan/plan_week';
import PlanService from './planService';
import WorkoutType from '../models/plan/workout_type';
import UserRepository from '../repository/user/userRepository';
import env from '../env';
import UserService from './userService';
import CoachInfoRepository from '../repository/user/coachInfoRepository';
import CoachInfo from '../models/user/coach_info';
import SendBirdService from './sendBirdService';
import to from 'await-to-js';
import PushNotificationService from './pushNotificationService';

const client = require('twilio')(env.TWILIO_SID, env.TWILIO_TOKEN); // eslint-disable-line

const MAX_DISTANCE = 100;

export default class WorkoutService {

	public static async create (currentUser: User, {
		planId,
		name,
		workoutTypeId,
		workoutTypeName = null,
		description,
		distance,
		time,
		paceId,
		shortDate,
		scheduledMessage
	}) {
		const workoutRepository : WorkoutRepository = await getConnection().getCustomRepository(WorkoutRepository);
		const workoutTypeRepository : WorkoutTypeRepository = await getConnection().getCustomRepository(WorkoutTypeRepository);
		const planRepository : PlanRepository = await getConnection().getCustomRepository(PlanRepository);

		const fullPlan = await planRepository.getFullPlanById(planId);

		if (!fullPlan) {
			throw new ApplicationError('Plan not found', HttpStatusCodes.NOT_FOUND);
		}

		if (currentUser.userTypeId === UserType.COACH) {
			if (fullPlan.coachId !== currentUser.userId) {
				throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
			}
		} else if (currentUser.userTypeId === UserType.ATHLETE) {
			if (fullPlan.athleteId !== currentUser.userId) {
				throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
			}
		}

		if (!workoutTypeName && !workoutTypeId) {
			// not a real case with a correct frontend
			throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
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
			time = (Number(time.split(':')[0]) * 60 + Number(time.split(':')[1]))*60; // eslint-disable-line
		}

		const workouts: Workout[] = (fullPlan.planWeeks.map((week: PlanWeek) => week.workouts))
			.reduce((res, w) => res.concat(w), []);

		if (workouts.find((w)=> w.date === shortDate)) {
			throw new ApplicationError(`Cannot copy to ${shortDate} as there are already assigned workouts`, HttpStatusCodes.CONFLICT);
		}

		const startDate : string = fullPlan.startDate.toLocaleString('en-US').split(',')[0];

		const fistDayOfPlan = PlanService.getMondayOfCurrentWeek(new Date(`${startDate}T00:00:00`), false);
		const lastDayOfFirstWeek = PlanService.getSundayOfCurrentWeek(new Date(`${startDate}T00:00:00`), false);
		const lastDayOfPlan = lastDayOfFirstWeek;
		lastDayOfPlan.setDate(lastDayOfPlan.getDate() + (fullPlan.planWeeks.length - 1) * 7 - 1); // eslint-disable-line

		const date = new Date(`${shortDate}T00:00:00`);
		if (date < fistDayOfPlan || date > lastDayOfPlan) {
			throw new ApplicationError(`Workout should be from ${fistDayOfPlan.toLocaleString('en-US').split(',')[0]} to ${lastDayOfPlan.toLocaleString('en-US').split(',')[0]}`, HttpStatusCodes.NOT_ACCEPTABLE); // eslint-disable-line
		}

		const fistDayOfSelectedWeek = PlanService.getMondayOfCurrentWeek(date, false);
		const diffWeeks = PlanService.weeksBetween(fistDayOfSelectedWeek, fistDayOfPlan);
		const weekToNewWorkout : PlanWeek = fullPlan.planWeeks[diffWeeks];

		if (!weekToNewWorkout) {
			throw new ApplicationError(`Workout should be from ${fistDayOfPlan.toLocaleString('en-US').split(',')[0]} to ${lastDayOfPlan.toLocaleString('en-US').split(',')[0]}`, HttpStatusCodes.NOT_ACCEPTABLE); // eslint-disable-line
		}

		const workout = await workoutRepository.createWithoutTemplte({
			planWeekId: weekToNewWorkout.planWeekId,
			name,
			workoutTypeId,
			description,
			distance,
			time,
			paceId,
			date,
			scheduledMessage,
		});

		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		await to(userRepository.updateRiskByUserId(fullPlan.athleteId));

		return workout;
	}

	public static async getById (currentUser: User, workoutId: number) {
		const workoutRepository : WorkoutRepository = await getConnection().getCustomRepository(WorkoutRepository);

		if (isNaN(Number(workoutId))) {
			throw new ApplicationError('Wrong workout id');
		}

		const workout : Workout = await workoutRepository.findById(workoutId);

		if (!workout) {
			throw new ApplicationError('Workout not found', HttpStatusCodes.NOT_FOUND);
		}

		if (currentUser.userTypeId === UserType.COACH) {
			if (workout.planWeek.plan.coachId !== currentUser.userId) {
				throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
			}
		} else if (currentUser.userTypeId === UserType.ATHLETE) {
			if (workout.planWeek.plan.athleteId !== currentUser.userId) {
				throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
			}
		}

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

			if (workout.pace && coachInfo && coachInfo.measurementId === CoachInfo.MEASUREMENT_ID_KM) {
				workout.pace.name = (workout.pace.name || '').replace('Mile', 'Kilometer');
				workout.pace.description = (workout.pace.description || '').replace('Mile', 'Kilometer').replace('mile', 'kilometer');
			}
		}

		return workout;
	}

	public static async changeStatus (currentUser: User, workoutId: number, statusId: number, athleteId?: number) {
		const workoutRepository : WorkoutRepository = getConnection().getCustomRepository(WorkoutRepository);
		const lastActivityRepository: LastActivityRepository = getConnection().getCustomRepository(LastActivityRepository);
		const planRepository : PlanRepository = getConnection().getCustomRepository(PlanRepository);
		const userRepository : UserRepository = getConnection().getCustomRepository(UserRepository);

		if (isNaN(Number(workoutId))) {
			throw new ApplicationError('Wrong workout id');
		}

		const workout : Workout = await workoutRepository.findById(workoutId);

		if (!workout) {
			throw new ApplicationError('Workout not found', HttpStatusCodes.NOT_FOUND);
		}

		let coach: User;
		if (currentUser && currentUser.userTypeId === UserType.COACH) {
			if (workout.planWeek.plan.coachId !== currentUser.userId) {
				throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
			}
			coach = currentUser;
		} else if (currentUser && currentUser.userTypeId === UserType.ATHLETE) {
			if (workout.planWeek.plan.athleteId !== currentUser.userId) {
				throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
			}
			coach = await UserService.getMyCoach(currentUser);
		}

		const athleteIdToSave = currentUser ? currentUser.userId : athleteId;

		await workoutRepository.setStatus(workoutId, statusId);
		if (athleteIdToSave && statusId === WorkoutStatus.DID_IT) {
			await lastActivityRepository.set(athleteIdToSave, LastActivityType.WORKOUT_COMPLETED, workout.workoutType.name, workout.workoutId);
		}

		const fullPlan = await planRepository.getFullPlanById(workout.planWeek.planId);

		if (!fullPlan) {
			throw new ApplicationError('Plan not found', HttpStatusCodes.NOT_FOUND);
		}

		const workouts: Workout[] = (fullPlan.planWeeks.map((week: PlanWeek) => week.workouts))
			.reduce((res, w) => res.concat(w), []);

		if (!workouts || workouts.length === 0) {
			throw new Error('Not real case');
		}

		const fisrtWorkout : Workout = workouts[0];
		const fistDayOfPlan = PlanService.getMondayOfCurrentWeek(new Date(`${fisrtWorkout.date}T00:00:00`), false);
		const fistDayOfSelectedWeek = PlanService.getMondayOfCurrentWeek(new Date(`${workout.date}T00:00:00`), false);
		const diffWeeks = PlanService.weeksBetween(fistDayOfSelectedWeek, fistDayOfPlan);
		const weekOfWorkout : PlanWeek = fullPlan.planWeeks[diffWeeks];

		if (weekOfWorkout && weekOfWorkout.workouts) {
			const realWorkouts = (weekOfWorkout.workouts || []).filter((w) => w.workoutTypeId !== WorkoutType.REST);
			if (athleteIdToSave && realWorkouts.every((w) => w.workoutStatusId === WorkoutStatus.DID_IT)) {
				// all workouts compleated as planed

				const athlete = await userRepository.findById(athleteIdToSave);

				if (athlete && athlete.isSmsEnabled && coach && coach.isSmsEnabled) {
					client.messages
						.create({
							body: `You aced your workouts this week, ${athlete.firstName}! Well done, you! 👏🏼`,
							from: env.TWILIO_PHONE,
							to: athlete.phone,
						})
						.catch((e) => console.log(e));
				}
			}
		}

		await to(SendBirdService.updateWorkoutsMetadata(athleteIdToSave));
		await to(userRepository.updateRiskByUserId(athleteIdToSave));

		return workout;
	}

	public static async updateAthleteNotes (currentUser: User, workoutId: number, text: string) {
		return getConnection().transaction(async (entityManager) => {
			const workoutRepository : WorkoutRepository = entityManager.getCustomRepository(WorkoutRepository);
			const messageRepository: MessageRepository = entityManager.getCustomRepository(MessageRepository);

			if (isNaN(Number(workoutId))) {
				throw new ApplicationError('Wrong workout id');
			}

			const workout : Workout = await workoutRepository.findById(workoutId);

			if (!workout) {
				throw new ApplicationError('Workout not found', HttpStatusCodes.NOT_FOUND);
			}

			const isFromAthlete = currentUser.userTypeId === UserType.ATHLETE;
			if (isFromAthlete) {
				await messageRepository.removeMessagesByWorkoutId(workoutId);
			} else { // from coach
				await to(PushNotificationService.sendToUser(workout.planWeek.plan.athleteId, {
					title: `${currentUser.firstName} commented on your workout`,
					body: text,
					workoutId,
					typeId: PushNotificationService.NOTIFICATION_TYPES.WORKOUT_DETAILS,
				}));
			}

			await messageRepository.addList([{
				text,
				date: new Date(),
				isFromAthlete,
			}], workout.planWeek.planId, workoutId, currentUser.userId);
		})
			.then(async () => {
				if (currentUser.userTypeId === UserType.ATHLETE) {
					const userRepository : UserRepository = getConnection().getCustomRepository(UserRepository);
					await to(userRepository.updateRiskByUserId(currentUser.userId));
				}
			});
	}

	public static async getAthleteNotes (currentUser: User, workoutId: number) {
		return getConnection().transaction(async (entityManager) => {
			const workoutRepository : WorkoutRepository = entityManager.getCustomRepository(WorkoutRepository);
			const messageRepository: MessageRepository = entityManager.getCustomRepository(MessageRepository);

			if (isNaN(Number(workoutId))) {
				throw new ApplicationError('Wrong workout id');
			}

			const workout : Workout = await workoutRepository.findById(workoutId);

			if (!workout) {
				throw new ApplicationError('Workout not found', HttpStatusCodes.NOT_FOUND);
			}

			const data = await messageRepository.findByWorkoutId(workoutId);

			return data;
		});
	}

	public static async updateResults (currentUser: User, workoutId: number, { distance, time, pace }) {
		return getConnection().transaction(async (entityManager) => {
			const workoutRepository : WorkoutRepository = entityManager.getCustomRepository(WorkoutRepository);

			const workout : Workout = await workoutRepository.findById(workoutId);

			if (!workout) {
				throw new ApplicationError('Workout not found', HttpStatusCodes.NOT_FOUND);
			}

			if (currentUser.userTypeId === UserType.COACH) {
				if (workout.planWeek.plan.coachId !== currentUser.userId) {
					throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
				}
			} else if (currentUser.userTypeId === UserType.ATHLETE) {
				if (workout.planWeek.plan.athleteId !== currentUser.userId) {
					throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
				}
			}

			if (typeof distance !== 'undefined') {
				if (distance) {
					const preparedDistance = Math.min(99, Number(distance)); // eslint-disable-line

					await workoutRepository.setCompletedDistance(workoutId, Number(preparedDistance.toFixed(2)));
				} else {
					await workoutRepository.setCompletedDistance(workoutId, null);
				}
			}

			if (typeof pace !== 'undefined') {

				let cleanStravaPace = false; // true if new != prev // Clean, BIRD-1568
				if (pace) {
					const m = Number(pace.split(':')[0]);
					const s = Number(pace.split(':')[1]);
					let newPace = Math.round((m * 60 + s) / 6) / 10; // eslint-disable-line
					newPace = isFinite(newPace) ? newPace : 0;

					if (Math.abs(newPace - workout.avgPace) > 0.001) { // eslint-disable-line
						await workoutRepository.setAvgPace(workoutId, newPace);
						cleanStravaPace = true;
					}
				} else {
					await workoutRepository.setAvgPace(workoutId, null);
					cleanStravaPace = true;
				}

				if (workout.activityId && cleanStravaPace) {
					await workoutRepository.match({
						workoutId,
						activityId: null, // Clean, BIRD-1568
					});
				}
 			}

			if (typeof time !== 'undefined') { // hh:mm
				if (time) {
					const h = Number(time.split(':')[0]);
					const m = Number(time.split(':')[1]);
					await workoutRepository.setMovingTime(workoutId, (h * 60 + m) * 60);
				} else {
					await workoutRepository.setMovingTime(workoutId, null);
				}
			}

		});
	}

	public static async deleteById (currentUser: User, workoutId: number) {
		return getConnection().transaction(async (entityManager) => {
			const workoutRepository : WorkoutRepository = entityManager.getCustomRepository(WorkoutRepository);
			const messageRepository : MessageRepository = entityManager.getCustomRepository(MessageRepository);

			if (isNaN(Number(workoutId))) {
				throw new ApplicationError('Wrong workout id');
			}

			const workout : Workout = await workoutRepository.findById(workoutId);

			if (!workout) {
				throw new ApplicationError('Workout not found', HttpStatusCodes.NOT_FOUND);
			}

			if (currentUser.userTypeId === UserType.COACH) {
				if (workout.planWeek.plan.coachId !== currentUser.userId) {
					throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
				}
			} else if (currentUser.userTypeId === UserType.ATHLETE) {
				throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
			}

			if (workout.message && workout.message.messageId) {
				await messageRepository.removeWorkoutId(workout.message.messageId);
			}

			await workoutRepository.delete(workoutId);

			return workout;
		})
			.then(async (workout) => {
				if (workout?.planWeek?.plan?.athleteId) {
					const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
					await to(userRepository.updateRiskByUserId(workout?.planWeek?.plan?.athleteId));
				}
				return workout;
			});
	}

	public static async updateById (currentUser: User, {
		workoutId,
		name,
		description,
		distance,
		time,
		paceId,
		workoutTypeId,
		workoutTypeName = null,
		scheduledMessage
	}) {
		const workoutRepository : WorkoutRepository = await getConnection().getCustomRepository(WorkoutRepository);
		const workoutTypeRepository = getConnection().getCustomRepository(WorkoutTypeRepository);

		if (isNaN(Number(workoutId))) {
			throw new ApplicationError('Wrong workout id');
		}

		const workout : Workout = await workoutRepository.findById(workoutId);

		if (!workout) {
			throw new ApplicationError('Workout not found', HttpStatusCodes.NOT_FOUND);
		}

		if (currentUser.userTypeId === UserType.COACH) {
			if (workout.planWeek.plan.coachId !== currentUser.userId) {
				throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
			}
		} else if (currentUser.userTypeId === UserType.ATHLETE) {
			throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
		}

		if (!workoutTypeName && !workoutTypeId) {
			// not a real case with a correct frontend
			throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
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
			time = (Number(time.split(':')[0]) * 60 + Number(time.split(':')[1]))*60; // eslint-disable-line
		}

		await workoutRepository.updateById(workoutId, {
			name,
			description,
			distance,
			time,
			paceId,
			workoutTypeId,
			scheduledMessage
		});

		return workout;
	}

	public static async copy (currentUser: User, workoutId: number, dates: string[]) {
		const workoutRepository : WorkoutRepository = await getConnection().getCustomRepository(WorkoutRepository);

		if (isNaN(Number(workoutId))) {
			throw new ApplicationError('Wrong workout id');
		}

		const workout : Workout = await workoutRepository.findById(workoutId);

		if (!workout) {
			throw new ApplicationError('Workout not found', HttpStatusCodes.NOT_FOUND);
		}

		if (dates === null || typeof dates[Symbol.iterator] !== 'function') {
			throw new ApplicationError('Wrong dates param');
		}

		if (currentUser.userTypeId === UserType.COACH) {
			if (workout.planWeek.plan.coachId !== currentUser.userId) {
				throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
			}
		} else if (currentUser.userTypeId === UserType.ATHLETE) {
			if (workout.planWeek.plan.athleteId !== currentUser.userId) {
				throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
			}
		}

		const badDates = [];
		const messages = [];
		for (const date of dates) {
			await Promise.resolve()
				.then(() => this.create(currentUser, {
					planId: workout.planWeek.planId,
					name: workout.name,
					workoutTypeId: workout.workoutTypeId,
					description: workout.description,
					distance: workout.distance,
					time: workout.time,
					paceId: workout.paceId,
					shortDate: date,
					scheduledMessage: workout.scheduledMessage
				}))
				.then(() => {
					messages.push(`${date} copied successfully.`);
				})
				.catch((error: Error) => {
					badDates.push(date);
					messages.push(error.message);
				});
		}

		return [badDates, messages];
	}

	public static async listOfWorkoutTypes(user: User) : Promise<WorkoutType[]>{
		const workoutTypeRepository = getConnection().getCustomRepository(WorkoutTypeRepository);

		return workoutTypeRepository.list(user.userId);
	}

	public static async updateWorkoutsMessage(workoutsIds, message) : Promise<any>{
		const workoutRepository : WorkoutRepository = await getConnection().getCustomRepository(WorkoutRepository);
		const workouts = await workoutRepository.updateWorkoutMessage(workoutsIds, message);
		return workouts;
	}

	public static async updateWorkoutMessage(workoutId, message) : Promise<any>{
		const workoutRepository : WorkoutRepository = await getConnection().getCustomRepository(WorkoutRepository);
		const workouts = await workoutRepository.updateWorkoutMessageById(workoutId, message);
		return workouts;
	}

	public static async setMarkedAsKeyStatus (currentUser: User, workoutId, isMarkedAsKey) {
		const workoutRepository : WorkoutRepository = await getConnection().getCustomRepository(WorkoutRepository);

		if (isNaN(Number(workoutId))) {
			throw new ApplicationError('Wrong workout id');
		}

		const workout : Workout = await workoutRepository.findById(workoutId);

		if (!workout) {
			throw new ApplicationError('Workout not found', HttpStatusCodes.NOT_FOUND);
		}

		if (workout.planWeek.plan.coachId !== currentUser.userId) {
			throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
		}

		const workoutsForThisWeek = await workoutRepository.getWorkoutsByPlanWeekId(workout.planWeek.planWeekId);
		const keyWorkouts = (workoutsForThisWeek || []).filter((w) => w.isMarkedAsKey);

		if (keyWorkouts && keyWorkouts.length >= 3) {
			throw new ApplicationError('You can select only 3 workouts');
		}

		await workoutRepository.setMarkedAsKeyStatus(workoutId, isMarkedAsKey);

		return workout;
	}

	public static async setLikeStatus (currentUser: User, workoutId, isLiked: boolean) {
		const workoutRepository : WorkoutRepository = await getConnection().getCustomRepository(WorkoutRepository);

		if (isNaN(Number(workoutId))) {
			throw new ApplicationError('Wrong workout id');
		}

		const workout : Workout = await workoutRepository.findById(workoutId);

		if (!workout) {
			throw new ApplicationError('Workout not found', HttpStatusCodes.NOT_FOUND);
		}

		if (workout.planWeek.plan.coachId !== currentUser.userId) {
			throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
		}

		await workoutRepository.setLikeStatus(workoutId, isLiked);

		if (isLiked) {
			await to(PushNotificationService.sendToUser(workout.planWeek.plan.athleteId, {
				title: 'Well done, you!',
				body: `${currentUser.firstName} liked your workout! 💛`,
				workoutId: workout.workoutId,
				typeId: PushNotificationService.NOTIFICATION_TYPES.WORKOUT_CARD,
			}));
		}

		return workout;
	}


	public getWorkoutDateFromTemplate(workoutDayNumber: number, weekNumber: number, startDate?: Date) {
		const date = startDate ? new Date(startDate) : new Date();
		let dayOfWeek = date.getDay();
		// Sunday
		if (dayOfWeek === 0) {
			dayOfWeek = 7; // eslint-disable-line no-magic-numbers
		}

		// eslint-disable-next-line no-magic-numbers
		const newDate = date.getDate() + (workoutDayNumber + (7 * weekNumber) - dayOfWeek) % (7 * weekNumber + (7 - dayOfWeek) + 1);
		date.setDate(newDate);

		return date.toLocaleString('en-US').split(',')[0];
	}

}
