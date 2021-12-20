import {EntityRepository, Repository} from 'typeorm';
import WorkoutTemplate from '../../models/plan/workout_template';

@EntityRepository(WorkoutTemplate)
export default class WorkoutTemplateRepository extends Repository<WorkoutTemplate> {
	public addWorkoutToWeekTemplate(planWeekTemplateId, {
		name,
		workoutTypeId,
		description,
		distance,
		time,
		paceId,
		dayNumber,
		scheduledMessage
	}) : Promise<WorkoutTemplate>{
		return this.save({
			planWeekTemplateId,
			name,
			workoutTypeId,
			description: description || '',
			distance,
			time,
			paceId,
			dayNumber,
			scheduledMessage
		});
	}

	public findById(workoutTemplateId: number): Promise<WorkoutTemplate> {
		return this.findOne({
			where: { workoutTemplateId },
		});
	}

	public updateById(workoutTemplateId: number, {
		name,
		description,
		distance,
		time,
		paceId,
		workoutTypeId,
		scheduledMessage,
	}){
		return this.update(workoutTemplateId, {
			name,
			description: description || '',
			distance,
			time,
			paceId,
			workoutTypeId,
			scheduledMessage
		});
	}

	public deleteById(workoutTemplateId: number) {
		return this.delete(workoutTemplateId);
	}

	public deleteByWeekTemplateId(planWeekTemplateId: number) {
		return this.delete({
			planWeekTemplateId
		});
	}

	public updateWorkoutTemplateMessageById(workoutTemplateId, message): Promise<any> {
		return this.update({ workoutTemplateId }, {
			scheduledMessage: message
		});
	}

}
