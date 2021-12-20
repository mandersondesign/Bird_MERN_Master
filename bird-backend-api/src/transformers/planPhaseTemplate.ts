import PlanPhaseTemplate from '../models/plan/plan_phase_template';
import PlanWeekTemplateTransformer from './planWeekTemplate';

export default class PlanPhaseTemplateTransformer {
	public static transform(phase: PlanPhaseTemplate) : any {
		return {
			/* eslint-disable */
			plan_phase_template_id: phase.planPhaseTemplateId,
			plan_template_id: phase.planTemplateId,
			name: phase.name,
			description: phase.description,
			number_of_phase: phase.numberOfPhase,
			plan_week_templates: (phase.planWeekTemplates || []).map((week) => PlanWeekTemplateTransformer.transform(week)),
			/* eslint-enable */
		};
	}
}
