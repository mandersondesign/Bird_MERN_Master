export default class MetaTransformer {
	public static transform({ limit, page, totalCount, maxPage, name }) : any {
		return {
			/* eslint-disable */
			limit,
			page,
			name,
			total_count: totalCount,
			max_page: maxPage,
			/* eslint-enable */
		};
	}
}
