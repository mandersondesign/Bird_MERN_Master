import * as dotenv from 'dotenv';
dotenv.config();

import to from 'await-to-js';
import * as cron from 'node-cron';
import {createConnections, getConnection, getConnectionOptions} from 'typeorm';
import * as Sentry from './sentry';
import UserRepository from './repository/user/userRepository';
import FleetfeetService from './services/fleetfeetService';

process.on('unhandledRejection', (reason, p) => {
	console.log('Unhandled Rejection at:', p, 'reason:', reason);
	Sentry.captureException(reason);
});

console.log('Athlete risk daemon is started');
(async () => {
	const defaultDb = await getConnectionOptions('default');
	createConnections([defaultDb])
		.then(async () => {
			let status = 'waiting';
			cron.schedule('0 0 5 * * *', async () => {
				if (status !== 'waiting') {
					console.log('Cron already running');
					return;
				}

				status = 'running';

				console.log('Start risk cron');

				const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
				const list = await userRepository.getAthletesWithWorkouts();

				for (const item of list) {
					await to(userRepository.updateRiskByUserId(item.userId));
				}

				status = 'waiting';
			}, {
				timezone: 'America/Chicago' // https://raw.githubusercontent.com/node-cron/tz-offset/master/generated/offsets.json
			});

			let status2 = 'waiting';
			cron.schedule('0 0 7 * * *', async () => {
				if (status2 !== 'waiting') {
					console.log('Cron already running');
					return;
				}

				status2 = 'running';

				console.log('Start daily fleetfeet cron');

				// BIRD-1249 API: generate and send daily report
				await to(FleetfeetService.sendListOfNewUsers());

				status2 = 'waiting';
			}, {
				timezone: 'America/Chicago' // https://raw.githubusercontent.com/node-cron/tz-offset/master/generated/offsets.json
			});
		});
})();
