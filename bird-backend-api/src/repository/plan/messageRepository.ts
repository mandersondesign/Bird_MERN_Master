import { EntityRepository, Repository } from 'typeorm';
import Message from '../../models/plan/message';

@EntityRepository(Message)
export default class MessageRepository extends Repository<Message> {

	public addList(messages: any, planId: number, workoutId: number, athleteId: number) {
		return this.save(messages.map((m) => ({
			planId,
			workoutId,
			athleteId,
			isFromAthlete: m.isFromAthlete,
			date: m.date,
			text: m.text,
		})));
	}

	public removeWorkoutId(messageId: number) {
		return this.update(messageId, {
			workoutId: null,
		});
	}

	public removeMessagesByWorkoutId(workoutId: number) {
		return this.delete({
			workoutId,
			isFromAthlete: true,
		});
	}

	public findByWorkoutId(workoutId: number): Promise<Message[]> {
		return this.find({
			where: { workoutId },
		});
	}

	public saveMessage(text: string, date: Date, planId: number, athleteId: number) {
		return this.save({
			planId,
			athleteId,
			isFromAthlete: false,
			date,
			text,
		});
	}

	public saveDirectMessage(text: string, date: Date, coachId: number, athleteId: number, isFromAthlete: boolean) {
		return this.save({
			coachId,
			athleteId,
			isFromAthlete,
			date,
			text,
		});
	}

	public getMessagesForCoach(coachId: number, atheleteId: number) {
		return this.find({
			relations: ['plan', 'workout'],
			join: {
				alias: 'message',
				leftJoinAndSelect: {
					plan: 'message.plan',
				},
			},
			where: queryBuilder => {
				queryBuilder
					.where('plan.coachId = :coachId', {
						coachId,
					})
					.andWhere('message.athleteId = :atheleteId', { atheleteId })
					.orWhere('message.coachId = :coachId AND message.athleteId = :atheleteId', { coachId, atheleteId });
			},
		});
	}

	public async setReadDate(messageIds: number[] = []) {
		return this.save(messageIds.map((m) => ({
			readDate: new Date(),
			messageId: m
		})));
	}

}
