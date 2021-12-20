import StripeCard from '../models/subscription/stripe_card';

export default class StripeCardTransformer {
	public static transform(card: StripeCard) : any {

		/* eslint-disable */
		return {
			stripe_card_id: card.stripeCardId,
			brand: card.brand,
			funding: card.funding,
			exp_month: card.expMonth,
			exp_year: card.expYear,
			last4: card.last4,
		};
	}
}
