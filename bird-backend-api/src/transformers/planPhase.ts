import PlanWeekTransformer from './planWeek';

export default class PlanPhaseTransformer {
	public static transform(item: any) : any {
		return {
			/* eslint-disable */
			phase_number: item.numberOfPhase,
			name: item.name,
			description: item.description,
			weeks: (item.weeks || []).map((week) => PlanWeekTransformer.transform(week)),
			/* eslint-enable */
		};
	}
}
