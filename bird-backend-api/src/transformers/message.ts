import Message from '../models/plan/message';

export default class MessageTransformer {
	public static transform(message: Message) {
		return {
			message_id: message.messageId, // eslint-disable-line
			text: message.text,
			date: message.date,
			is_from_athlete: message.isFromAthlete, // eslint-disable-line
			readDate: message.readDate, // eslint-disable-line
		};
	}
}
