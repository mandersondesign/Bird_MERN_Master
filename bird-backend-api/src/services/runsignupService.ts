import { getConnection, MoreThanOrEqual } from 'typeorm';
import axios from 'axios';
import env from '../env';
import { ExportToCsv } from 'export-to-csv';
import ApplicationError from '../errors/applicationError';
import { encrypt, decrypt } from '../utils/encryption';
import RunSignupRaceRepository from '../repository/runsignup/raceRepository';
import RunSignupParticipantRepository from '../repository/runsignup/participantRepository';
import ActiveCampaignService from './activeCampaignService';
import AuthService from './authService';
import ProgramRepository from '../repository/plan/programRepository';

const { google } = require('googleapis'); // eslint-disable-line

const getRaceAndEventData = async (raceURL, raceQueryString) => {
	const { race } = (await axios.get(`${raceURL}${raceQueryString}`)).data;

	const eventData = race.events.map(({ event_id: id, name, start_time: startTime, distance }) => (
		{ id, name, startTime, distance })
	);

	return { raceName: race.name, eventData, addons: race.registration_addons };
};

const getRaceFromDb = async (raceRepo, raceId) => (await raceRepo.findByRsuRaceId(raceId));

const addRaceToDb = async (raceRepo, apiKey, apiSecret, raceId, raceName, mainTag, endDate) => {
	const encryptedApiKey = encrypt(apiKey);
	const encryptedApiSecret = encrypt(apiSecret);

	const race = raceRepo.create({
		name: raceName,
		newsletterTag: mainTag,
		endAfterDate: endDate,
		rsuRaceId: raceId,
		apiKey: encryptedApiKey,
		apiSecret: encryptedApiSecret,
	});

	return await raceRepo.save(race);
};

const getParticipants = async (url, queryString, id) => {
	// if a race event has no participants, the participants object is not returned
	const { participants } = (await axios.get(`${url}${queryString}&event_id=${id}`)).data[0];
	return participants || [];
};

// https://developers.activecampaign.com/reference#create-or-update-contact-new
const transformParticipantForActiveCampaign = ({ user }, fieldIds, raceName, event) => {
	const { first_name: firstName, last_name: lastName, email, dob, phone } = user;
	const contact = { firstName, lastName, email, phone, fieldValues: [] };

	Object.keys(fieldIds).forEach((field) => {
		const valueMap = {
			Birthdate: dob,
			'Race Name': raceName,
			'Event Name': event.name,
			'Event Date': event.startTime,
			'Event Distance': event.distance
		};

		contact.fieldValues.push({ field: fieldIds[field], value: valueMap[field] });
	});

	return { contact };
};

const addTagsToContact = async (contactId, tagNames) => (
	await Promise.all(tagNames.map(async (tagName) => await ActiveCampaignService.addTagToContact(tagName, contactId)))
);

const addContactToActiveCampaign = async (participant, fieldIds, raceName, event, runsignupListId, mainTag) => {
	const newContact = transformParticipantForActiveCampaign(participant, fieldIds, raceName, event);
	const { contact } = await ActiveCampaignService.createOrUpdateContact(newContact);
	await ActiveCampaignService.addContactToList(runsignupListId, contact.id);
	const tagNames = [mainTag, event.name];
	await addTagsToContact(contact.id, tagNames);
};

const addParticipantToDb = async (participantRepo, participant, race, event) => {
	const { user, age, registration_id: registrationId, registration_date: registrationDate, addons } = participant;

	const {
		user_id: rsuUserId,
		first_name: firstName,
		middle_name: middleName,
		last_name: lastName,
		email,
		dob,
		gender,
		phone,
	} = user;

	const { street, city, state, zipcode, country_code: countryCode } = user.address;

	let newParticipant = {
		rsuUserId,
		firstName,
		middleName,
		lastName,
		email,
		dob,
		age,
		gender,
		phone,
		street,
		city,
		state,
		zipcode,
		countryCode,
		registrationId,
		registrationDate,
		rsuRaceId: race.rsuRaceId,
		raceName: race.name,
		eventId: event.id,
		eventName: event.name,
		eventStartTime: event.startTime,
		race: race.raceId,
		addons
	};

	newParticipant = participantRepo.create(newParticipant);
	newParticipant = await participantRepo.save(newParticipant);
	return newParticipant;
};

const updateLastRegistrationId = async (participantRepo, raceRepo, race) => {
	const latestRegistrant = await participantRepo
		.createQueryBuilder('participant')
		.where('participant.rsu_race_id = :raceId', { raceId: race.rsuRaceId })
		.orderBy('participant.registration_id', 'DESC')
		.getOne();

	await raceRepo.update(race.raceId, { lastRegistrationId: latestRegistrant.registrationId });
};

const addRaceDataToGoogleDrive = async (raceRepo, race, participantRepo) => {
	const oAuth2Client = new google.auth.OAuth2(env.GOOGLE_CLIENT_ID, env.GOOGLE_CLIENT_SECRET, 'https://www.bird.coach');

	oAuth2Client.setCredentials({ refresh_token: env.GOOGLE_REFRESH_TOKEN }); // eslint-disable-line

	const drive = google.drive({ version: 'v3', auth: oAuth2Client });
	const date = new Date();
	const isoDate = date.toISOString().split('T')[0];

	const fileMetadata = {
		name: `${isoDate}-${race.name}.csv`,
		parents: [env.GOOGLE_DRIVE_RSU_DIR],
		mimeType: 'application/vnd.google-apps.spreadsheet'
	};

	const options = {
		fieldSeparator: ',',
		quoteStrings: '',
		decimalSeparator: '.',
		showLabels: true,
		showTitle: false,
		title: '',
		useTextFile: false,
		useBom: false,
		useKeysAsHeaders: true
	};

	const allParticipants = await participantRepo.find({ where: { rsuRaceId: race.rsuRaceId } });

	if (!!allParticipants.length) {
		const csvExporter = new ExportToCsv(options);
		const csvFile = csvExporter.generateCsv(allParticipants, true);
		const media = { mimeType: 'text/csv', body: csvFile };

		const { id: fileId } = (await drive.files.create({ resource: fileMetadata, media, fields: 'id' })).data;

		if (race.googleFileId) {
			await drive.files.delete({ fileId: race.googleFileId });
		}

		await raceRepo.update(race.raceId, { googleFileId: fileId });
	}
};

export default class RunsignupService {
	public static async importRunsignupData(apiKey: string, apiSecret: string, raceId: number, mainTag: string, endDate: string) {
		const raceURL = `https://runsignup.com/rest/race/${raceId}`;
		const participantsURL = `${raceURL}/participants`;
		const baseQueryString = `?api_key=${apiKey}&api_secret=${apiSecret}&format=json`;
		// const raceQueryString = `${baseQueryString}&future_events_only=T&include_addons=T`;
		const raceQueryString = `${baseQueryString}&include_addons=T`;

		let participantsQueryString = `${baseQueryString}&results_per_page=2500&include_registration_addons=T`;

		try {
			const { raceName, eventData } = await getRaceAndEventData(raceURL, raceQueryString);
			const raceRepository: RunSignupRaceRepository = getConnection().getCustomRepository(RunSignupRaceRepository);
			const participantRepository: RunSignupParticipantRepository = getConnection().getCustomRepository(RunSignupParticipantRepository);

			let race = await getRaceFromDb(raceRepository, raceId);

			if (!race) {
				race = await addRaceToDb(raceRepository, apiKey, apiSecret, raceId, raceName, mainTag, endDate);
			}

			let events = eventData;
			if (race.events) {
				let eventsIds = race.events.split(',');
				eventsIds = eventsIds.map(e => parseInt(e, 10));
				events = events.filter(e => eventsIds.some(i => i === e.id));
			}

			const lastRegistrationId = race.lastRegistrationId;

			participantsQueryString = `${participantsQueryString}&after_registration_id=${lastRegistrationId}`;
			const runsignupListId = await ActiveCampaignService.getListId('Runsignup');
			const runsignupFields = ['Birthdate', 'Race Name', 'Event Name', 'Event Date', 'Event Distance'];
			const fieldIds = await ActiveCampaignService.getCustomFieldIds(runsignupFields);

			/* if (live) { */
			const eventParticipantPromises = events.map(async (event) => {
				const participants = await getParticipants(participantsURL, participantsQueryString, event.id);
				const programRepository: ProgramRepository = getConnection().getCustomRepository(ProgramRepository);

				const participantPromises = participants.map(async (participant) => {
					await addContactToActiveCampaign(participant, fieldIds, raceName, event, runsignupListId, mainTag);

					let savedParticipant = await participantRepository.findByRegistrationId(participant.registration_id);

					if (!savedParticipant) {
						if (participant.participant_addons && participant.participant_addons.length) {
							participant.addons = [];

							for (const addon of participant.participant_addons) {
								const program = await programRepository.findByAddon(addon.addon_name);

								if (program) {
									participant.addons.push(addon.addon_name);

									await AuthService.addProspect({
										firstName: (participant.user.first_name || '').trim(),
										lastName: (participant.user.last_name || '').trim(),
										email: (participant.user.email || '').toLowerCase().trim(),
										phone: participant.user.phone,
										programAlias: program.alias,
										eventName: 'Race Addon'
									});
								}
							}
						}

						savedParticipant = await addParticipantToDb(participantRepository, participant, race, event) as any;
					}

					return savedParticipant;
				});

				return await Promise.all(participantPromises);
			});

			await Promise.all(eventParticipantPromises);
			await updateLastRegistrationId(participantRepository, raceRepository, race);
			// await addRaceDataToGoogleDrive(raceRepository, race, participantRepository);
			/* } else {
				const eventParticipantPromises = eventData.map(async (event) => {
					const participants = await getParticipants(participantsURL, participantsQueryString, event.id);

					const participantPromises = participants.map(async (participant) => {
						console.log(`${participant.user.first_name} ${participant.user.last_name}`);
						return null;
					});

					return await Promise.all(participantPromises);
				});
			} */

			console.log('Race Participants Imported');
		} catch (err) {
			console.log(err);
			throw new ApplicationError('Error importing race data');
		}
	};

	public static async updateRunsignupData() {
		try {
			const raceRepository: RunSignupRaceRepository = getConnection().getCustomRepository(RunSignupRaceRepository);

			const allActiveRaces = await raceRepository.find({
				where: {
					endAfterDate: MoreThanOrEqual(new Date())
				}
			});

			await Promise.all(allActiveRaces.map(async (race) => {
				const decryptedApiKey = decrypt(race.apiKey);
				const decryptedApiSecret = decrypt(race.apiSecret);
				const endDate = new Date(race.endAfterDate).toISOString().split('T')[0];
				return await this.importRunsignupData(decryptedApiKey, decryptedApiSecret, race.rsuRaceId, race.newsletterTag, endDate);
			}));

			console.log('All Active Race Data Updated');
		} catch (err) {
			console.log(err);
			throw new ApplicationError('Error updating race data');
		}
	};

	/* public static async query() {
		try {
			const raceRepository: RunSignupRaceRepository = getConnection().getCustomRepository(RunSignupRaceRepository);

			let allActiveRaces = await raceRepository.find({
				where: {
					endAfterDate: MoreThanOrEqual(new Date())
				}
			});

			//allActiveRaces = [allActiveRaces[1]];

			await Promise.all(allActiveRaces.map(async (race) => {
				const decryptedApiKey = decrypt(race.apiKey);
				const decryptedApiSecret = decrypt(race.apiSecret);
				const endDate = new Date(race.endAfterDate).toISOString().split('T')[0];
				return await this.importRunsignupData(decryptedApiKey, decryptedApiSecret, race.rsuRaceId, race.newsletterTag, endDate);
			}));

			console.log('All Active Race Data Updated');
		} catch (err) {
			console.log(err);
			throw new ApplicationError('Error updating race data');
		}
	}; */
}
