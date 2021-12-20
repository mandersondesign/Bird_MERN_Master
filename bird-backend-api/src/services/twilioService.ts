import * as HttpStatusCodes from 'http-status-codes';
import { getConnection } from 'typeorm';
import env from '../env';
import User from '../models/user/user';
import MessageRepository from '../repository/plan/messageRepository';
import WorkoutRepository from '../repository/plan/workoutRepository';
import ApplicationError from '../errors/applicationError';

const client = require('twilio')(env.TWILIO_SID, env.TWILIO_TOKEN); // eslint-disable-line

export default class TwilioService {

	public static async startTestFlow(phone, workoutId) {
		const workoutRepository: WorkoutRepository = getConnection().getCustomRepository(WorkoutRepository);
		const workout = await workoutRepository.getFullWorkoutById(workoutId);

		if (!workout) {
			throw new ApplicationError('Workout not found', HttpStatusCodes.NOT_FOUND);
		}

		const plan = workout.planWeek.plan;
		const athlete = plan.athlete;

		if (!athlete.isSmsEnabled) {
			throw new ApplicationError('SMS is disabled by athlete');
		}

		return client.studio.v1.flows(env.TWILIO_FLOW_ID)
			.executions
			.create({
				parameters: {
					first_name: athlete.firstName, // eslint-disable-line
					response_server: env.TWILIO_RESPONSE_URL, // eslint-disable-line
					athlete_id: athlete.userId,  // eslint-disable-line
					workout_id: workout.workoutId,  // eslint-disable-line
					plan_id: plan.planId, // eslint-disable-line
				},
				to: phone,
				from: env.TWILIO_PHONE,
			})
			.then(execution => console.log(execution))
			.catch(e => console.log(`> ${e}`));
	}

	public static async startFlow(athlete: User, coach: User, planId: number, workoutId: number) {
		if (!coach.isSmsEnabled || !athlete.isSmsEnabled) {
			return;
		}

		return client.studio.v1.flows(env.TWILIO_FLOW_ID)
			.executions
			.create({
				parameters: {
					first_name: athlete.firstName, // eslint-disable-line
					response_server: env.TWILIO_RESPONSE_URL, // eslint-disable-line
					athlete_id: athlete.userId,  // eslint-disable-line
					workout_id: workoutId,  // eslint-disable-line
					plan_id: planId, // eslint-disable-line
				},
				to: athlete.phone,
				from: env.TWILIO_PHONE,
			})
			.then(execution => console.log(execution))
			.catch(e => console.log(`> ${e}`));
	}

	public static async saveComments(sid, planId: number, workoutId: number, athleteId: number): Promise<any> {
		const messageRepository: MessageRepository = getConnection().getCustomRepository(MessageRepository);

		const widgets = await client.studio.v1.flows(env.TWILIO_FLOW_ID)
			.executions(sid)
			.executionContext()
			.fetch()
			.then(a => a.context.widgets)
			.catch(e => console.log(`> ${e}`));

		const messages = [];

		Object.keys(widgets).forEach((item) => {
			let date: Date = null;
			if (widgets[item] && widgets[item].outbound) {
				date = new Date(widgets[item].outbound.DateCreated);
				messages.push({
					text: widgets[item].outbound.Body,
					date,
					isFromAthlete: false,
				});
			}

			if (widgets[item] && widgets[item].inbound) {
				messages.push({
					text: widgets[item].inbound.Body,
					date: date ? new Date(new Date(date).setSeconds(date.getSeconds() + 1)) : new Date(),
					isFromAthlete: true,
				});
			}
		});

		await messageRepository.addList(messages, planId, workoutId, athleteId);

	}

	public static async saveOneComment({
		text,
		planId,
		workoutId,
		athleteId
	}): Promise<any> {
		const messageRepository: MessageRepository = getConnection().getCustomRepository(MessageRepository);

		await messageRepository.addList([{
			text,
			date: new Date(),
			isFromAthlete: true,
		}], planId, workoutId, athleteId);
	}

	public static async sendTestMsg(phone, body) {
		return client.messages
			.create({
				body,
				from: env.TWILIO_PHONE,
				to: phone,
			})
			.catch((e) => console.log(e));
	}

	public static async sendMessage(phone, body, planId, userId) {
		const messageRepository: MessageRepository = getConnection().getCustomRepository(MessageRepository);
		await client.messages
			.create({
				body,
				from: env.TWILIO_PHONE,
				to: phone,
			});
		return messageRepository.saveMessage(body, new Date(), planId, userId);
	}

	public static async sendTwillioSMS(phone, body)  {
		await client.messages
			.create({
				body,
				from: env.TWILIO_PHONE,
				to: phone,
			});
	}
}
