import { getConnection } from 'typeorm';
import Event from '../models/event/event';
import ImportantGoal from '../models/event/important_goal';
import EventRepository from '../repository/event/eventRepository';

export default class EventService {

	public static async list(isPaid: boolean) : Promise<Event[]>{
		const eventRepository: EventRepository = getConnection().getCustomRepository(EventRepository);

		if (isPaid) {
			return eventRepository.findAllForPaidAthlete();
		}

		return eventRepository.findAllForFreeAthlete();
	}

	public static async listOfImportantGoals() {
		const importantGoalRepository = getConnection().getRepository(ImportantGoal);
		const goals: ImportantGoal[] = await importantGoalRepository.find();

		return goals;
	}
}
