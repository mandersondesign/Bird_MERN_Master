import {EntityRepository, Repository} from 'typeorm';
import Note from '../../models/user/note';

@EntityRepository(Note)
export default class NoteRepository extends Repository<Note> {
	public addNote(athleteId: number, coachId: number, text: string) {
		return this.save({
			coachId,
			athleteId,
			text,
		});
	}

	public getNote(athleteId: number, coachId: number): Promise<Note> {
		return this.findOne({
			where: {
				athleteId,
				coachId,
			 },
		});
	}

	public updateNote(athleteId: number, coachId: number, text: string) {
		return this.update({
			athleteId,
			coachId,
		}, {
			text
		});
	}
}
