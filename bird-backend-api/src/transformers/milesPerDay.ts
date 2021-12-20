
export default class MilesPerDayTransformer {
	public static transform(item: any) : any {
		return {
			/* eslint-disable */
			distance: item.distance ? Number(item.distance) : 0,
			time: item.time ? Number(item.time) : 0,
			day: item.day,
			week: item.week,
			/* eslint-enable */
		};
	}
}
