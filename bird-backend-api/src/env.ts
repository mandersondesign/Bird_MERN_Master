const envalid = require('envalid'); // eslint-disable-line

// Validator types https://github.com/af/envalid#validator-types
export default envalid.cleanEnv(
	process.env,
	{
		PORT: envalid.port({
			default: 3000,
			desc: 'The port to start the server on'
		}),

		FRONTEND_URL: envalid.url(),
		BACKEND_URL: envalid.url({
			default: 'https://api.bird.coach'
		}),

		TYPEORM_HOST: envalid.host(),
		TYPEORM_USERNAME: envalid.str(),
		TYPEORM_PASSWORD: envalid.str(),
		TYPEORM_DATABASE: envalid.str(),
		TYPEORM_PORT: envalid.port(),

		JWT_SECRET: envalid.str({
			default: 'secret'
		}),

		MAIL_HOST: envalid.host(),
		MAIL_PORT: envalid.port(),
		MAIL_USER: envalid.str(),
		MAIL_PASSWORD: envalid.str(),
		MAIL_FROM: envalid.email(),
		MAIL_SECURE: envalid.bool({
			default: false
		}),

		AWS_ACCESS_KEY_ID: envalid.str(),
		AWS_SECRET_ACCESS_KEY: envalid.str(),
		AWS_DEFAULT_REGION: envalid.str(),
		AWS_S3_BUCKET: envalid.str(),

		SENTRY_DSN: envalid.url(),

		TWILIO_SID: envalid.str(),
		TWILIO_TOKEN: envalid.str(),
		TWILIO_FLOW_ID: envalid.str(),
		TWILIO_PHONE: envalid.str(),
		TWILIO_RESPONSE_URL: envalid.str(),

		SPY_LOGIN_IS_ACTIVE: envalid.bool({
			default: false
		}),
		SPY_LOGIN_PASSWORD: envalid.str(),

		STRIPE_SECRET_KEY: envalid.str(),
		STRIPE_WEBHOOK_KEY: envalid.str(),

		FLEET_FEET_SUPPORT_EMAIL: envalid.str({
			default: 'ann@bird.coach'
		}),

		STRAVA_CLIENT_ID: envalid.num(),
		STRAVA_CLIENT_SECRET: envalid.str(),
		STRAVA_VERIFY_TOKEN: envalid.str({
			default: 'STRAVA'
		}),

		FCM_KEY: envalid.str(),

		SENDBIRD_API_TOKEN: envalid.str(),
		SENDBIRD_API_URL: envalid.str(),
		SENDBIRD_API_ID:  envalid.str(),

		SQUARESPACE_API_KEY: envalid.str(),

		GOOGLE_DRIVE_FF_REPORT_DIR: envalid.str(),
		GOOGLE_DRIVE_RSU_DIR: envalid.str(),
		GOOGLE_CLIENT_ID: envalid.str(),
		GOOGLE_CLIENT_SECRET: envalid.str(),
		GOOGLE_REFRESH_TOKEN: envalid.str(),

		ACTIVE_CAMPAIGN_URL: envalid.str(),
		ACTIVE_CAMPAIGN_API_TOKEN: envalid.str(),

		ACTIVE_CAMPAIGN_EVENT_TRACKING_URL: envalid.str(),
		ACTIVE_CAMPAIGN_EVENT_ACCOUNT_ID: envalid.str(),
		ACTIVE_CAMPAIGN_EVENT_KEY: envalid.str(),

		ENCRYPTION_KEY: envalid.str()
	},
	{ strict: true }
);
