import ImportantGoal from '../models/event/important_goal';

export default class ImportantGoalTransformer {
	public static transform(goal: ImportantGoal) {
		return {
			important_goal_id: goal.importantGoalId, // eslint-disable-line
			name: goal.name,
		};
	}
}
