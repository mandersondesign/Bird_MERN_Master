
export class Routes {

	public routes(app): void {

		app.use('/v1/auth', require('./auth')); // eslint-disable-line

		app.use('/v1/subscriptions', require('./subscriptions')); // eslint-disable-line

		app.use('/v1/users', require('./users')); // eslint-disable-line

		app.use('/v1/events', require('./events')); // eslint-disable-line

		app.use('/v1/plans', require('./plans')); // eslint-disable-line

		app.use('/v1/plan_templates', require('./plan_templates')); // eslint-disable-line

		app.use('/v1/weeks', require('./weeks')); // eslint-disable-line

		app.use('/v1/workouts', require('./workouts')); // eslint-disable-line

		app.use('/v1/workout_library', require('./workout_library')); // eslint-disable-line

		app.use('/v1/athletes', require('./athletes')); // eslint-disable-line

		app.use('/v1/coaches', require('./coaches')); // eslint-disable-line

		app.use('/v1/coaches', require('./coaches')); // eslint-disable-line

		app.use('/v1/stripe', require('./stripe')); // eslint-disable-line

		app.use('/v1/fleetfeet', require('./fleetfeet')); // eslint-disable-line

		app.use('/v1/runsignup', require('./runsignup')); // eslint-disable-line

		app.use('/v1/program', require('./program')); // eslint-disable-line

		app.use('/v1/strava', require('./strava')); // eslint-disable-line

		app.use('/v1/apple', require('./apple')); // eslint-disable-line

		app.use('/v1', require('./default')); // eslint-disable-line

		app.use('/v2/auth', require('./v2/auth')); // eslint-disable-line

		app.use('/v1/messages', require('./messages')); // eslint-disable-line

		// app.use('/v1/test', require('./test')); // eslint-disable-line
	}
}
