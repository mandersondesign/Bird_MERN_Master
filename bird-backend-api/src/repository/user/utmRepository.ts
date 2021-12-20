import {EntityRepository, In, Repository} from 'typeorm';
import Utm from '../../models/user/utm';

@EntityRepository(Utm)
export default class UtmRepository extends Repository<Utm> {

	public add( { userId, utmSource, utmMedium, utmCampaign, utmTerm, utmContent }) {
		return this.save({
			userId,
			utmSource,
			utmMedium,
			utmCampaign,
			utmTerm,
			utmContent,
		});
	}

	public findByUserIds(ids: number[]): Promise<Utm[]> {
		return this.find({
			where: { userId: In(ids) },
		});
	}
}
