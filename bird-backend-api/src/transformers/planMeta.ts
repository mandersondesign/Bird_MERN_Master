import IPlanMeta from '../interfaces/IPlanMeta';

export default class PlanMetaTransformer {
	public static transform(meta: IPlanMeta) : any {
		return {
			/* eslint-disable */
			phases: {
				current: meta.phases.current,
				total: meta.phases.total,
			},
			weeks: {
				current: meta.weeks.current,
				total: meta.weeks.total,
			},
			miles: {
				total: meta.miles.total,
				assigned: meta.miles.assigned,
				ran: meta.miles.ran,
			},
			workouts: {
				total: meta.workouts.total,
				assigned: meta.workouts.assigned,
				completed: meta.workouts.completed,
			},
			goal: {
				time: meta.goal.time,
				type: meta.goal.type,
			},
			time: {
				assigned: meta.time.assigned,
				completed: meta.time.completed,
			},
			/* eslint-enable */
		};
	}
}
