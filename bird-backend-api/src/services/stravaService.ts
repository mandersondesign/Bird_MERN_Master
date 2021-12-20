import { getConnection } from 'typeorm';
import * as HttpStatusCodes from 'http-status-codes';
import ApplicationError from '../errors/applicationError';
import UserRepository from '../repository/user/userRepository';
import StravaAuthRepository from '../repository/strava/stravaAuthRepository';
import StravaSplitRepository from '../repository/strava/stravaSplitRepository';
import StravaActivityRepository from '../repository/strava/stravaActivityRepository';
import User from '../models/user/user';
import env from '../env';
import fetch from 'node-fetch';
import * as qs from 'qs';
import WorkoutRepository from '../repository/plan/workoutRepository';
import WorkoutStatus from '../models/plan/workout_status';
import CoachInfoRepository from '../repository/user/coachInfoRepository';
import CoachInfo from '../models/user/coach_info';
import UserService from './userService';
import UserType from '../models/user/user_type';
import to from 'await-to-js';
import StravaAthleteRepository from '../repository/strava/stravaAthleteRepository';
import StravaAthlete from '../models/strava/athlete';
import Workout from '../models/plan/workout';
import LastActivityRepository from '../repository/user/lastActivityRepository';
import LastActivityType from '../models/user/last_activity_type';
import SendBirdService from './sendBirdService';

const ONE_MILE = 1.609344;

export default class StravaService {

	public static async connect(userId: number, code: string) : Promise<any>{
		return getConnection().transaction(async (entityManager) => {

			if (!code) {
				throw new ApplicationError('Code is required');
			}

			const userRepository: UserRepository = entityManager.getCustomRepository(UserRepository);
			const stravaAuthRepository: StravaAuthRepository = entityManager.getCustomRepository(StravaAuthRepository);
			const stravaAthleteRepository: StravaAthleteRepository = entityManager.getCustomRepository(StravaAthleteRepository);

			const user : User = await userRepository.findById(userId);

			if (!user) {
				throw new ApplicationError('User is not found', HttpStatusCodes.NOT_FOUND);
			}

			const uri =
				'https://www.strava.com/api/v3/oauth/token?' +
				qs.stringify({
					client_id: env.STRAVA_CLIENT_ID, // eslint-disable-line
					client_secret: env.STRAVA_CLIENT_SECRET, // eslint-disable-line
					grant_type: 'authorization_code', // eslint-disable-line
					code,
				});
			const response = await fetch(uri, { method: 'post' });

			const result = await response.json();

			if (result.errors) {
				throw new ApplicationError('Something wrong with Strava Auth');
			}

			const {
				refresh_token: refreshToken,
				access_token: accessToken,
				expires_at: expiresAt,
				athlete: {
					id: stravaAthleteId,
					firstname,
					lastname,
				}
			} = result;

			if (!refreshToken || !stravaAthleteId) {
				throw new ApplicationError('Something wrong with Strava Auth');
			}

			await stravaAthleteRepository.set({
				refreshToken,
				accessToken,
				expiresAt: new Date(expiresAt * 1000),
				stravaAthleteId,
			});

			const stravaAuth = await stravaAuthRepository.findByUserId(userId);
			if (stravaAuth) {
				await stravaAuthRepository.deleteByUserId(userId);
			}

			await stravaAuthRepository.add({
				userId,
				stravaAthleteId,
				name: `${firstname} ${lastname}`,
			});

		});
	}

	public static async pushSubscriptions() : Promise<any>{
		const uri =
			'https://www.strava.com/api/v3/push_subscriptions?' +
			qs.stringify({
				client_id: env.STRAVA_CLIENT_ID, // eslint-disable-line
				client_secret: env.STRAVA_CLIENT_SECRET, // eslint-disable-line
				callback_url: `${env.BACKEND_URL}/v1/strava/webhook`, // eslint-disable-line
				verify_token: env.STRAVA_VERIFY_TOKEN, // eslint-disable-line
			});
		const response = await fetch(uri, { method: 'post' });

		const result = await response.json();

		console.log(result);
	}

	public static async deauthorize(user: User) : Promise<any>{
		return getConnection().transaction(async (entityManager) => {

			if (!user) {
				throw new ApplicationError('User is required');
			}

			const stravaAuthRepository: StravaAuthRepository = entityManager.getCustomRepository(StravaAuthRepository);

			const [err, accessToken] = await to(this.getAccessToken(user.userId));

			if (err) {
				console.log(err);
			}

			if (accessToken) {
				const uri =
					'https://www.strava.com/api/v3/oauth/deauthorize?' +
					qs.stringify({
						access_token: accessToken, // eslint-disable-line
					});
				const response = await fetch(uri, { method: 'post' });

				await response.json();
			}

			await stravaAuthRepository.deleteByUserId(user.userId);
		});
	}

	public static async getAccessToken(userId: number, stravaAthleteId?: number) : Promise<string>{
		return getConnection().transaction(async (entityManager) => {
			const stravaAuthRepository: StravaAuthRepository = entityManager.getCustomRepository(StravaAuthRepository);
			const stravaAthleteRepository: StravaAthleteRepository = entityManager.getCustomRepository(StravaAthleteRepository);

			let stravaAthlete : StravaAthlete = null;
			if (stravaAthleteId) {
				stravaAthlete = await stravaAthleteRepository.findByStravaAthleteId(stravaAthleteId);
			} else {
				const stravaAuth = await stravaAuthRepository.findByUserId(userId);
				stravaAthlete = stravaAuth?.stravaAthlete;
			}

			if (!stravaAthlete) {
				throw new ApplicationError('Strava is not connected');
			}

			if (new Date() < stravaAthlete.expiresAt) {
				return stravaAthlete.accessToken;
			}

			const uri =
				'https://www.strava.com/api/v3/oauth/token?' +
				qs.stringify({
					client_id: env.STRAVA_CLIENT_ID, // eslint-disable-line
					client_secret: env.STRAVA_CLIENT_SECRET, // eslint-disable-line
					grant_type: 'refresh_token', // eslint-disable-line
					refresh_token: stravaAthlete.refreshToken, // eslint-disable-line
				});
			const response = await fetch(uri, { method: 'post' });

			const result = await response.json();

			if (result.errors) {
				throw new ApplicationError('Can not refresh token:' + JSON.stringify(result.errors));
			}

			const {
				access_token: accessToken,
				expires_at: expiresAt,
				refresh_token: refreshToken,
			} = result;

			await stravaAthleteRepository.set({
				stravaAthleteId: stravaAthlete.stravaAthleteId,
				accessToken,
				refreshToken,
				expiresAt:  new Date(expiresAt * 1000),
			});

			return accessToken;
		});
	}

	public static async grabActivity(stravaAthleteId: number, objectId: number, userId?: number) : Promise<any>{
		const stravaActivity = await getConnection().transaction(async (entityManager) => {
			if (!stravaAthleteId || !objectId) {
				throw new Error('Strava Webhook: Bad Request');
			}

			const accessToken = userId ? await this.getAccessToken(userId) : await this.getAccessToken(null, stravaAthleteId);
			const uri = `https://www.strava.com/api/v3/activities/${objectId}`;
			const response = await fetch(uri, { method: 'get', headers: { 'Authorization': `Bearer ${accessToken}` }, });

			const result = await response.json();

			if (result.errors) {
				const stravaAuthRepository: StravaAuthRepository = entityManager.getCustomRepository(StravaAuthRepository);

				if (userId) {
					await stravaAuthRepository.deleteByUserId(userId);
				} else {
					await stravaAuthRepository.deleteByStravaAthleteId(stravaAthleteId);
				}

				return null;
			}

			const stravaActivityRepository: StravaActivityRepository = entityManager.getCustomRepository(StravaActivityRepository);
			let activity = await stravaActivityRepository.findById(result.id);

			if (!activity && result && result.athlete) {
				activity = await stravaActivityRepository.add({
					activityId: result.id,
					stravaAthleteId: result.athlete.id,
					name: result.name,
					completedDistance: Number(result.distance) / 1000,
					movingTime: result.moving_time,
					elapsedTime: result.elapsed_time,
					startDate: new Date(result.start_date),
				});
			}

			const stravaSplitRepository: StravaSplitRepository = entityManager.getCustomRepository(StravaSplitRepository);

			let laps = null;
			if (result.laps && result.laps.length > 1) {
				laps = result.laps;
			} else if (result.splits_standard) {
				laps = result.splits_standard;
			}

			if (laps && result && result.athlete) {
				const params = {
					activityId: result.id,
					stravaAthleteId: result.athlete.id,
				};

				await stravaSplitRepository.deleteAcitivityData(params);
				await stravaSplitRepository.addList(params, laps);
			}

			return activity;
		});

		if (!stravaActivity) {
			return null;
		}

		// Match single workout
		const workoutRepository: WorkoutRepository = getConnection().getCustomRepository(WorkoutRepository);
		const workouts : Workout[] = await workoutRepository.listOfWorkoutsForStravaActivity(stravaActivity.startDate, stravaActivity.stravaAthleteId);

		for (const workout of workouts) {
			if (workout.activityId === stravaActivity.activityId || workout.stravaActivitiesCount >= 100) {
				// do nothing
				continue;
			}

			if (!workout.activityId && workout.stravaActivitiesCount === 0) {
				await to(StravaService.match(workout.planWeek.plan.athlete, {
					workoutId: workout.workoutId,
					activityId: stravaActivity.activityId,
				}));
			} else {
				await workoutRepository.clean(workout.workoutId); // Clean, BIRD-1594
			}

			await workoutRepository.setStravaActivitiesCount(workout.workoutId, workout.stravaActivitiesCount + 1);
		}

		return stravaActivity;
	}

	public static async listOfActivities(user: User, date: string) : Promise<any>{
		return getConnection().transaction(async (entityManager) => {
			const stravaAuthRepository: StravaAuthRepository = entityManager.getCustomRepository(StravaAuthRepository);
			const stravaActivityRepository: StravaActivityRepository = entityManager.getCustomRepository(StravaActivityRepository);
			const coachInfoRepository: CoachInfoRepository = entityManager.getCustomRepository(CoachInfoRepository);

			const stravaAuth = await stravaAuthRepository.findByUserId(user.userId);

			if (!stravaAuth) {
				throw new ApplicationError('Strava is not connectted');
			}

			if (!date) {
				date = (new Date()).toLocaleString('en-US').split(',')[0];
			}

			let coachInfo;
			if (user.userTypeId === UserType.COACH) {
				coachInfo = await coachInfoRepository.findById(user.userId);
			} else if (user.userTypeId === UserType.ATHLETE) {
				const coach = await UserService.getMyCoach(user);
				coachInfo = coach.coachInfo;
			}

			const acivities = await stravaActivityRepository.findByStravaAthleteId(stravaAuth.stravaAthleteId, date);

			if (coachInfo && coachInfo.measurementId === CoachInfo.MEASUREMENT_ID_KM) {
				return acivities;
			}

			return acivities.map((a) => {
				a.completedDistance = Number(a.completedDistance) / ONE_MILE;
				return a;
			});
		});
	}

	public static async getActivityChart(user: User, workoutId: number) : Promise<any>{
		return getConnection().transaction(async (entityManager) => {

			if (!user) {
				throw new ApplicationError('User is required');
			}

			const workoutRepository: WorkoutRepository = entityManager.getCustomRepository(WorkoutRepository);
			const stravaSplitRepository: StravaSplitRepository = entityManager.getCustomRepository(StravaSplitRepository);
			const coachInfoRepository: CoachInfoRepository = entityManager.getCustomRepository(CoachInfoRepository);

			const workout = await workoutRepository.findById(workoutId);

			if (!workout) {
				throw new ApplicationError('Wrong workout id');
			}

			let coachInfo;
			if (user.userTypeId === UserType.COACH) {
				coachInfo = await coachInfoRepository.findById(user.userId);
			} else if (user.userTypeId === UserType.ATHLETE) {
				const coach = await UserService.getMyCoach(user);
				coachInfo = coach.coachInfo;
			}

			const stravaSplits = workout.activityId ? await stravaSplitRepository.findByActivityId(workout.activityId) : null;

			if (!stravaSplits) {
				return [{
					pace: 0,
					time: 0,
					distance: 0,
				}];
			}

			let fixForDistance = ONE_MILE;
			if (coachInfo && coachInfo.measurementId === CoachInfo.MEASUREMENT_ID_KM) {
				fixForDistance = 1;
			}

			let distance = 0;
			let time = 0;
			const data = stravaSplits.map((split) => {
				time += Number(split.movingTime); // sec
				distance += Number(split.distance); // km

				return {
					pace: Math.round((Number(split.movingTime) /  (Number(split.distance) / fixForDistance )) / 6) / 10, // eslint-disable-line
					time: Math.round(time / 60), // eslint-disable-line
					distance: distance / fixForDistance,
				};
			});

			return data;
		});
	}

	public static async match(athlete: User, { workoutId, activityId, isManual = false }) : Promise<any>{
		return getConnection().transaction(async (entityManager) => {
			if (!workoutId || !activityId) {
				throw new ApplicationError('Bad request');
			}

			const workoutRepository : WorkoutRepository = entityManager.getCustomRepository(WorkoutRepository);
			const workout = await workoutRepository.findById(workoutId);

			if (!workout) {
				throw new ApplicationError('Workout not found', HttpStatusCodes.NOT_FOUND);
			}

			const stravaActivityRepository: StravaActivityRepository = entityManager.getCustomRepository(StravaActivityRepository);
			const activity = await stravaActivityRepository.findById(activityId);

			if (!activity) {
				throw new ApplicationError('Activity not found', HttpStatusCodes.NOT_FOUND);
			}

			if (activity.movingTime) {
				await workoutRepository.setMovingTime(workoutId, activity.movingTime);
			}

			const coach = await UserService.getMyCoach(athlete);

			let fixForDistance = 1;
			if (!coach || coach.coachInfo && coach.coachInfo.measurementId === CoachInfo.MEASUREMENT_ID_MILE) {
				fixForDistance = ONE_MILE;
			}

			const preparedDistance = Number(activity.completedDistance) / fixForDistance;

			let workoutStatusId = WorkoutStatus.NO_RESULTS;

			if (Number(workout.distance) <= preparedDistance) {
				workoutStatusId = WorkoutStatus.DID_IT;
			} else if (preparedDistance > 0) {
				workoutStatusId = WorkoutStatus.PARTIALLY_DONE;
			}

			const avgPace = Math.round((Number(activity.movingTime) /  preparedDistance) / 6) / 10; // eslint-disable-line
			await workoutRepository.completeWorkout(workoutId, {
				workoutStatusId,
				completedDistance: preparedDistance,
				avgPace: isFinite(avgPace) ? avgPace : 0,
			});

			if (workoutStatusId !== WorkoutStatus.NO_RESULTS) {
				const lastActivityRepository: LastActivityRepository = entityManager.getCustomRepository(LastActivityRepository);
				await lastActivityRepository.set(athlete.userId, LastActivityType.WORKOUT_COMPLETED, workout.workoutType?.name, workout.workoutId);
			}

			await workoutRepository.match({
				workoutId,
				activityId,
			});

			if (isManual) {
				await workoutRepository.setStravaActivitiesCount(workout.workoutId, 100);
			}

			await to(SendBirdService.updateWorkoutsMetadata(athlete.userId));

			return athlete.userId;
		})
			.then(async(athleteId) => {
				const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
				await to(userRepository.updateRiskByUserId(athleteId));
			});
	}

	public static async sync(user: User) : Promise<any>{
		if (!user) {
			throw new ApplicationError('User is required');
		}

		const [err, accessToken] = await to(this.getAccessToken(user.userId));
		if (err) {
			throw new ApplicationError('Strava is not connected');
		}

		const uri = 'https://www.strava.com/api/v3/athlete/activities?per_page=10';
		const response = await fetch(uri, { method: 'get', headers: { 'Authorization': `Bearer ${accessToken}` }, });

		const result = await response.json();

		if (result.errors) {
			throw new ApplicationError('Can not sync: ' + JSON.stringify(result.errors));
		}

		const list = result.filter((a) => a.athlete).map((a) => ({ stravaAthleteId: a.athlete.id, activityId: a.id }));

		for (const item of list) {
			await to(this.grabActivity(item.stravaAthleteId, item.activityId, user.userId));
		}
	}
}
