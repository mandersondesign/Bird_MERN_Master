import Event from '../models/event/event';

export default class EventTransformer {
	public static transform(event: Event) {
		return {
			event_id: event.eventId, // eslint-disable-line
			name: event.name,
			distance: Number(event.distance),
			image: event.image,
			html: event.html || '',
		};
	}
}
