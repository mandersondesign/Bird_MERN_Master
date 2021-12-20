import PlanTemplate from '../models/plan/plan_template';
import PlanPhaseTemplateTransformer from './planPhaseTemplate';

export default class PlanTemplateTransformer {
	public static transform(template: PlanTemplate | any) : any {
		return {
			/* eslint-disable */
			plan_template_id: template.planTemplateId || template.plan_template_id,
			name: template.name,
			event_id: template.eventId,
			coach_id: template.coachId,
			amount_of_week: template.count ? Number(template.count) : null,
			last_update: template.lastUpdate || template.last_update,
			plan_phase_template: (template.planPhaseTemplates || []).map((phase) => PlanPhaseTemplateTransformer.transform(phase)),
			scheduled_message: template.scheduledMessage,

			/* eslint-enable */
		};
	}
}
