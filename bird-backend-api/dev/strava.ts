import { createConnection, getConnectionOptions } from 'typeorm';
import StravaService from '../src/services/stravaService';

import * as dotenv from 'dotenv';
import to from 'await-to-js';
dotenv.config();

const StravaApiV3 = require('strava_api_v3');
const defaultClient = StravaApiV3.ApiClient.instance;
const strava_oauth = defaultClient.authentications['strava_oauth'];

const userId = 850;

(async () : Promise<any> => {
	const connectionOptions = await getConnectionOptions();
	createConnection(connectionOptions).then(async () => {
		strava_oauth.accessToken = await StravaService.getAccessToken(userId);
		console.log(strava_oauth.accessToken);

		const athletesApi = new StravaApiV3.AthletesApi();
		const activitiesApi = new StravaApiV3.ActivitiesApi();


		const stravaAthleteInfo : any = await new Promise((resolve, reject) => {
			athletesApi.getLoggedInAthlete((error, data) => {
				if (error) {
					reject(error);
				} else {
					resolve(data);
				}
			});
		});

		console.log(stravaAthleteInfo.id, stravaAthleteInfo.firstname, stravaAthleteInfo.lastname);

		const opts : any  = { 
			// 'before': 1286668800000, // Number | An epoch timestamp to use for filtering activities that have taken place before a certain time.
			// 'after': 1602288000000, // Number | An epoch timestamp to use for filtering activities that have taken place after a certain time.
			'page': 1, // Number | Page number.
			'perPage': 100 // Number | Number of items per page. Defaults to 30.
		};

		const activities : any = await new Promise((resolve, reject) => {
			activitiesApi.getLoggedInAthleteActivities(opts, (error, data) => {
				if (error) {
					reject(error);
				} else {
					resolve(data);
				}
			});
		});
		
		console.log(activities.map((a) => a.id));

		for (const activity of activities) {
			const [err, acc] = await to(StravaService.grabActivity(stravaAthleteInfo.id, activity.id));
			if (err) {
				console.log('Grab error', activity.id, err.message);
			}

			console.log(activity.id, activity.name, activity.startDate);
		};

	}).catch((error) => console.log('Error: '));
})();

// 	activitiesApi.getActivityById(id, { includeAllEfforts: true }, callback);
// 	var api = new StravaApiV3.StreamsApi()
// 	var keys = ['distance', 'time', 'latlng', 'heartrate', 'altitude', 'cadence', 'watts', 'temp', 'moving', 'grade_smooth', 'velocity_smooth']; // {array[String]} Desired stream types.
// 	api.getActivityStreams(id, keys, true, callback);

/* Push subscription
curl -X POST https://www.strava.com/api/v3/push_subscriptions \
-F client_id=53087 \
-F client_secret=c1a13a14540bb47ab2ad849d6413f951ab5702e9 \
-F 'callback_url=https://5c7dae56dd42.ngrok.io/v1/strava/webhook' \
-F 'verify_token=STRAVA'
*/

/* Refresh token
curl -X POST https://www.strava.com/api/v3/oauth/token \
-d client_id=53087 \
-d client_secret=c1a13a14540bb47ab2ad849d6413f951ab5702e9 \
-d grant_type=refresh_token \
-d refresh_token=fbf672ac65c18310c47d4c208e7c3c84170c4603
*/

// post {} {
//   aspect_type: 'create',
//   event_time: 1600400712,
//   object_id: 4075956199,
//   object_type: 'activity',
//   owner_id: 50750299,
//   subscription_id: 163963,
//   updates: {}
// }
