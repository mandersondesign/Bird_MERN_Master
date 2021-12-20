import Event from '../../models/fleetfeet/event';

export default class FleetfeetEvent {
	public static transform(event: Event) {
		const price = Number(event.price);
		// 2.9% + 30 cents
		const fee = (price + 0.3) / (1 - 0.029) - price; // eslint-disable-line
		return {
			event_id: event.eventId, // eslint-disable-line
			name: event.name,
			description: event.description,
			price: price.toFixed(2),
			fee: fee.toFixed(2),
			fee_description: '2.9% + 30¢', // eslint-disable-line
			total: (price + fee).toFixed(2),
		};
	}
}
