import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from 'http-status-codes';
import { Routes } from './routes';
import * as Sentry from './sentry';
import ApplicationError from './errors/applicationError';
import * as morgan from 'morgan';

class App {

	public app: express.Application;
	public routePrv: Routes = new Routes();

	public constructor () {
		this.app = express();
		this.config();
		this.routePrv.routes(this.app);

		// Error handler
		this.app.use((error, req, res, next) => {
			if (!error) {
				return next();
			}

			const isAppError = error instanceof ApplicationError;
			let errorMessage = error.message || error;
			console.error(error);
			// log to sentry only system errors
			if (!isAppError) {
				Sentry.captureException(error);
				errorMessage = 'Internal error';
			}

			res.status(error.httpStatusCode || INTERNAL_SERVER_ERROR).json({
				error: errorMessage
			});
		});

		// 404 page
		this.app.use((_, res) => {
			res.status(NOT_FOUND).json({
				error: 'Not found'
			});
		});
	}

	private config(): void{
		this.app.disable('x-powered-by');
		this.app.use(cors());
		this.app.use(bodyParser.json({ limit: '10mb' }));
		this.app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
		// serving static files
		this.app.use(express.static('public'));
		this.app.use(morgan('short'));
	}
}

export default new App().app;
