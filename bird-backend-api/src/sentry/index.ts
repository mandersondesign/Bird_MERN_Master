import * as Sentry from '@sentry/node';
import env from '../env';

Sentry.init({
	dsn: env.SENTRY_DSN,
});

export * from '@sentry/node';
