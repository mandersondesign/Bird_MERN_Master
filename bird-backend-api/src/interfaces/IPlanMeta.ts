export default interface IPlanMeta {
	phases: {
		current: number;
		total: number;
	};

	weeks: {
		current: number;
		total: number;
	};

	miles: {
		total: number;
		assigned: number;
		ran: number;
	};

	workouts: {
		total: number;
		assigned: number;
		completed: number;
	};

	goal: {
		time: Date | string;
		type: number;
	};

	time: {
		assigned: string;
		completed: string;
	};
}
