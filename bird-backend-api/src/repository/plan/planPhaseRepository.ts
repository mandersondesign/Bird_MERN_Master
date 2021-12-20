import {EntityRepository, Repository} from 'typeorm';
import PlanPhase from '../../models/plan/phase';
import PlanPhaseTemplate from '../../models/plan/plan_phase_template';

@EntityRepository(PlanPhase)
export default class PlanPhaseRepository extends Repository<PlanPhase> {
	public createFromTemplate(planPhaseTemplates: PlanPhaseTemplate[]): Promise<PlanPhase[]> {
		return this.save(planPhaseTemplates.map((planPhaseTemplate) => ({
			name: planPhaseTemplate.name,
			description: planPhaseTemplate.description,
			numberOfPhase: planPhaseTemplate.numberOfPhase,
			planPhaseTemplateId: planPhaseTemplate.planPhaseTemplateId,
		})));
	}
}
