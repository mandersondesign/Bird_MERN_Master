import {EntityRepository, Repository} from 'typeorm';
import StripeCard from '../../models/subscription/stripe_card';

@EntityRepository(StripeCard)
export default class StripeCardRepository extends Repository<StripeCard> {

	public list(userId: number, limit = 1): Promise<StripeCard[]> {
		return this.find({
			where: {
				userId,
			},
			order: {
				stripeCardId: 'DESC'
			},
			take: limit,
		});
	}

	public add({
		userId,
		stripeCustomerId,
		stripeSourceId,
		brand,
		expMonth,
		expYear,
		fingerprint,
		funding,
		last4,
	}) : Promise<StripeCard>{
		return this.save({
			userId,
			stripeCustomerId,
			stripeSourceId,
			brand,
			expMonth,
			expYear,
			fingerprint,
			funding,
			last4,
		});
	}
}
