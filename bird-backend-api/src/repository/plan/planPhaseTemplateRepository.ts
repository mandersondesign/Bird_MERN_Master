import {EntityRepository, Repository} from 'typeorm';
import PlanPhaseTemplate from '../../models/plan/plan_phase_template';

@EntityRepository(PlanPhaseTemplate)
export default class PlanPhaseTemplateRepository extends Repository<PlanPhaseTemplate> {

	public findById(planPhaseTemplateId: number): Promise<PlanPhaseTemplate> {
		return this.findOne({
			where: { planPhaseTemplateId },
			relations: ['planWeekTemplates']
		});
	}

	public addNewPhase({
		planTemplateId,
		name,
		description,
		numberOfPhase,
	}) : Promise<PlanPhaseTemplate>{
		return this.save({
			planTemplateId,
			name,
			description,
			numberOfPhase,
		});
	}

	public updateById(planPhaseTemplateId: number, {
		name,
		description
	}){
		return this.update(planPhaseTemplateId, {
			name,
			description,
		});
	}

	public deleteById(planPhaseTemplateId: number){
		return this.delete(planPhaseTemplateId);
	}

	public updateNumberOfPhase(planPhaseTemplateId: number, numberOfPhase: number){
		return this.update(planPhaseTemplateId, {
			numberOfPhase,
		});
	}
}

