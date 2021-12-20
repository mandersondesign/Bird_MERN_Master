
export default class MilesPerWeeksTransformer {
	public static transform(item: any) : any {
		return {
			/* eslint-disable */
			number: Number(item.number),
			distance: Number(item.distance),
			time: Number(item.time),
			week: item.week,
			phase: item.phase,
			/* eslint-enable */
		};
	}
}
