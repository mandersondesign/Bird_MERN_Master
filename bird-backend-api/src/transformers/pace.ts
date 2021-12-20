import Pace from '../models/plan/pace';

export default class PaceTransformer {
	public static transform(item: Pace) : any {
		return {
			/* eslint-disable */
			pace_id: item.paceId,
            name: item.name,
            description: item.description,
			/* eslint-enable */
		};
	}
}
