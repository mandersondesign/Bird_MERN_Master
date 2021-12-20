import * as dotenv from 'dotenv';
dotenv.config();

import to from 'await-to-js';
import * as cron from 'node-cron';
import { createConnections, getConnection, getConnectionOptions } from 'typeorm';
import * as Sentry from './sentry';
import WorkoutRepository from './repository/plan/workoutRepository';
import PlanRepository from './repository/plan/planRepository';
import WorkoutStatus from './models/plan/workout_status';
import WorkoutType from './models/plan/workout_type';
import TwilioService from './services/twilioService';
import MessageService from './services/messageService';
import StravaActivityRepository from './repository/strava/stravaActivityRepository';
import PushNotificationService from './services/pushNotificationService';
import UserService from './services/userService';
import RunsignupService from './services/runsignupService';

process.on('unhandledRejection', (reason, p) => {
	console.log('Unhandled Rejection at:', p, 'reason:', reason);
	Sentry.captureException(reason);
});

console.log('Cron daemon is started');
(async () => {
	const defaultDb = await getConnectionOptions('default');
	createConnections([defaultDb])
		.then(async () => {
			if (true) {
				let status = 'waiting';
				cron.schedule('0 0 * * * *', async () => { // every hour
					if (status !== 'waiting') {
						console.log('Cron already running');
						return;
					}

					status = 'running';

					const date = new Date();

					const workoutRepository: WorkoutRepository = getConnection().getCustomRepository(WorkoutRepository);
					const workouts = await workoutRepository.listOfWorkoutsForCurrentHour(date);

					console.log('Start twilio flow for', workouts ? workouts.length : 0);

					for (const workout of workouts) {
						const plan = workout.planWeek.plan;
						const athlete = plan.athlete;

						// BIRD-1471 Do not send chatbot if workout is marked in mob app
						const isRequireSMS = workout.workoutStatusId === WorkoutStatus.NO_RESULTS && workout.workoutTypeId !== WorkoutType.REST;

						if (isRequireSMS) {
							const [err] = await to(TwilioService.startFlow(athlete, plan.coach, plan.planId, workout.workoutId));
							if (err) {
								console.log(err);
							}
						}
					}

					status = 'waiting';
				}, {
					timezone: 'America/Chicago' // https://raw.githubusercontent.com/node-cron/tz-offset/master/generated/offsets.json
				});
			}

			if (true) {
				let status = 'waiting';
				cron.schedule('0 0 * * * *', async () => { // every hour
					if (status !== 'waiting') {
						console.log('Cron already running');
						return;
					}

					status = 'running';

					const date = new Date();

					const workoutRepository: WorkoutRepository = getConnection().getCustomRepository(WorkoutRepository);
					const stravaActivityRepository: StravaActivityRepository = getConnection().getCustomRepository(StravaActivityRepository);
					const workouts = await workoutRepository.listOfWorkoutsForNextHour(date);
					const activities = (await stravaActivityRepository.listByDate(date)) || [];

					console.log('Start twilio flow for', workouts ? workouts.length : 0);

					for (const workout of workouts) {
						const plan = workout.planWeek.plan;
						const athlete = plan.athlete;

						const acts = activities.filter((activity) => activity.stravaAthleteId === athlete.stravaAuth.stravaAthleteId);
						const isRequirePush = workout.workoutStatusId === WorkoutStatus.NO_RESULTS && acts.length > 1;

						if (isRequirePush) {
							await to(PushNotificationService.sendToUser(athlete.userId, {
								title: 'Choose your workout',
								body: `You recorded ${acts.length} workouts today, tap to choose which one to use. 👉`,
								workoutId: workout.workoutId,
								typeId: PushNotificationService.NOTIFICATION_TYPES.WORKOUT_STRAVA,
							}));
						}
					}

					status = 'waiting';
				}, {
					timezone: 'America/Chicago' // https://raw.githubusercontent.com/node-cron/tz-offset/master/generated/offsets.json
				});
			}

			if (true) {
				// BIRD-1660

				let status = 'waiting';
				cron.schedule('0 0 18 * * 6', async () => {
					if (status !== 'waiting') {
						console.log('Cron already running');
						return;
					}

					status = 'running';

					console.log('Start weekly user list report cron');

					await to(UserService.sendUserListReport());

					status = 'waiting';
				}, {
					timezone: 'America/Chicago' // https://raw.githubusercontent.com/node-cron/tz-offset/master/generated/offsets.json
				});
			}

			if (true) {
				// BIRD-1885 Report that shows Athlete engagement

				let status = 'waiting';
				cron.schedule('0 0 18 * * 6', async () => {
					if (status !== 'waiting') {
						console.log('Cron already running');
						return;
					}

					status = 'running';

					console.log('Start weekly athlete engagement report cron');

					await to(UserService.sendAthleteEngagementReport());

					status = 'waiting';
				}, {
					timezone: 'America/Chicago' // https://raw.githubusercontent.com/node-cron/tz-offset/master/generated/offsets.json
				});
			}

			if (true) {
				// BIRD-2415 Missed 3 or more workouts in previous week

				let status = 'waiting';
				cron.schedule('0 0 15 * * 7', async () => {
					if (status !== 'waiting') {
						console.log('Cron already running');
						return;
					}

					status = 'running';

					console.log('Start push notification with motivation');

					await to(UserService.sendMotivationPushOnSunday());

					status = 'waiting';
				}, {
					timezone: 'America/Chicago' // https://raw.githubusercontent.com/node-cron/tz-offset/master/generated/offsets.json
				});
			}

			if (true) {
				// BIRD-2413 API: Inactive on day 3 of first week

				let status = 'waiting';
				cron.schedule('0 0 20 * * *', async () => {
					if (status !== 'waiting') {
						console.log('Cron already running');
						return;
					}

					status = 'running';

					console.log('Start push notification with motivation on first week');

					await to(UserService.sendMotivationPushDaily());

					status = 'waiting';
				}, {
					timezone: 'America/Chicago' // https://raw.githubusercontent.com/node-cron/tz-offset/master/generated/offsets.json
				});
			}

			if (true) {
				let status = 'waiting';
				cron.schedule('*/5 * * * *', async () => { // every 5 minutes
					if (status !== 'waiting') {
						console.log('Cron already running');
						return;
					}

					status = 'running';

					console.log('Start daily Runsignup race data update cron');

					await to(RunsignupService.updateRunsignupData());

					status = 'waiting';
				}, {
					timezone: 'America/Chicago' // https://raw.githubusercontent.com/node-cron/tz-offset/master/generated/offsets.json
				});
			}

			if (true) {
				let status = 'waiting';
				cron.schedule('0 8 * * *', async () => { // at 00:30 every day
					if (status !== 'waiting') {
						console.log('Cron already running');
						return;
					}

					status = 'running';

					const date = new Date();
					const formattedDate = date.toLocaleString('en-US').split(',')[0];
					const workoutRepository: WorkoutRepository = getConnection().getCustomRepository(WorkoutRepository);
					const workouts = await workoutRepository.listOfWorkoutsForDate(formattedDate);
					console.log('Start twilio flow for', workouts ? workouts.length : 0);

					for (const workout of workouts) {
						const plan = workout.planWeek.plan;
						const athlete = plan.athlete;
						const isRequireSMS = workout.scheduledMessage?.length > 0;

						if (isRequireSMS) {
							if (athlete.isSmsEnabled) {
								try {
									await TwilioService.sendTwillioSMS(athlete.phone, workout.scheduledMessage);
									await MessageService.sendMessage(workout.scheduledMessage, plan.coachId, athlete.userId, false);
								} catch (err) {
									console.log(err);
								}
							}
						}
					}

					status = 'waiting';
				}, {
					timezone: 'America/Chicago' // https://raw.githubusercontent.com/node-cron/tz-offset/master/generated/offsets.json
				});
			}

			if (true) {
				let status = 'waiting';
				cron.schedule('*/30 * * * *', async () => { // at every hour
					if (status !== 'waiting') {
						console.log('Cron already running');
						return;
					}

					status = 'running';

					const date = new Date();

					const planRepository: PlanRepository = getConnection().getCustomRepository(PlanRepository);
					const plans = await planRepository.getPendingMessagePlans(date);

					console.log('Start twilio flow for', plans ? plans.length : 0);

					for (const plan of plans) {
						const athlete = plan.athlete;

						const isRequireSMS = plan.scheduledMessage?.length > 0;

						if (isRequireSMS) {
							if (athlete.isSmsEnabled) {
								await TwilioService.sendTwillioSMS(athlete.phone, plan.scheduledMessage);
								await MessageService.sendMessage(plan.scheduledMessage, plan.coachId, athlete.userId, false);
								await planRepository.messageSent(plan.planId);
							}
						}
					}

					status = 'waiting';
				}, {
					timezone: 'America/Chicago' // https://raw.githubusercontent.com/node-cron/tz-offset/master/generated/offsets.json
				});
			}

		});
})();
