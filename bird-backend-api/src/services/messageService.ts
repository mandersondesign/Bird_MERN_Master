import { getConnection } from 'typeorm';
import MessageRepository from '../repository/plan/messageRepository';

export default class MessageService {
	public static async sendMessage(body, coachId, userId, isFromAthlete) {
		const messageRepository: MessageRepository = getConnection().getCustomRepository(MessageRepository);
		return messageRepository.saveDirectMessage(body, new Date(), coachId, userId, isFromAthlete);
	}

	public static async getMessagesForCoach(coachId, athleteId) {
		const messageRepository: MessageRepository = getConnection().getCustomRepository(MessageRepository);
		return messageRepository.getMessagesForCoach(coachId, athleteId);
	}

	public static async setReadDate(messageIds) {
		const messageRepository: MessageRepository = getConnection().getCustomRepository(MessageRepository);
		return messageRepository.setReadDate(messageIds);
	}
}
