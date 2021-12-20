import {EntityRepository, Repository} from 'typeorm';
import PlanWeekTemplate from '../../models/plan/plan_week_template';

@EntityRepository(PlanWeekTemplate)
export default class PlanWeekTemplateRepository extends Repository<PlanWeekTemplate> {

	public addWeekToTemplate(planPhaseTemplateId: number, numberOfWeek: number, description?: string): Promise<PlanWeekTemplate> {
		return this.save({
			planPhaseTemplateId,
			numberOfWeek,
			description,
		});
	}

	public findById(planWeekTemplateId: number): Promise<PlanWeekTemplate> {
		return this.findOne({
			where: { planWeekTemplateId },
			relations: ['workoutTemplates']
		});
	}

	public updateById(planWeekTemplateId: number, {
		description,
	}){
		return this.update(planWeekTemplateId, {
			description,
		});
	}

	public deleteById(planWeekTemplateId: number) {
		return this.delete(planWeekTemplateId);
	}

	public updateNumberOfWeek(planWeekTemplateId: number, planPhaseTemplateId: number, numberOfWeek: number){
		return this.update(planWeekTemplateId, {
			planPhaseTemplateId,
			numberOfWeek,
		});
	}
}
