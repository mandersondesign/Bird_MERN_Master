import { getConnection, Repository } from 'typeorm';
import to from 'await-to-js';
import * as fs from 'fs';
import * as HttpStatusCodes from 'http-status-codes';
import * as EmailValidator from 'email-validator';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import SurveyQuestion from '../models/fleetfeet/survey_question';
import FletfeetEvent from '../models/fleetfeet/event';
import ApplicationError from '../errors/applicationError';
import UserRepository from '../repository/user/userRepository';
import UserType from '../models/user/user_type';
import User from '../models/user/user';
import IDecodedToken from 'interfaces/IDecodedToken';
import env from '../env';
import Mail from '../utils/mail';
import phoneClean from '../utils/phoneClean';
import SessionRepository from '../repository/user/sessionRepository';
import FleetFeetEventRepository from '../repository/fleetfeet/eventRepository';
import Session from '../models/user/session';
import InviteRepository from '../repository/user/inviteRepository';
import LastActivityRepository from '../repository/user/lastActivityRepository';
import LastActivityType from '../models/user/last_activity_type';
import StripeService from './stripeService';
import passwordSchema from '../utils/passwordSchema';
import PlanService from './planService';
import SurveyAnswerRepository from '../repository/fleetfeet/surveyAnswerRepository';
import SurveyQuestionRepository from '../repository/fleetfeet/surveyQuestionRepository';
import {ExportToCsv} from 'export-to-csv';
import PayLogRepository from '../repository/fleetfeet/payLogRepository';
import FletfeetWaiver from '../models/fleetfeet/waiver';
import PlanTemplateRepository from '../repository/plan/planTemplateRepository';

const { google } = require('googleapis'); // eslint-disable-line

export default class FleetfeetService {

	public static async listOfSurveyQuestions(eventAlias: string) : Promise<SurveyQuestion[]>{

		let eventTypeId = 1;

		if (eventAlias) {
			const fleetFeetEventRepository: FleetFeetEventRepository = getConnection().getCustomRepository(FleetFeetEventRepository);
			const event: FletfeetEvent = await fleetFeetEventRepository.findByAlias(eventAlias);

			if (!event) {
				throw new ApplicationError('Not found', HttpStatusCodes.NOT_FOUND);
			}

			eventTypeId = event.eventTypeId;
		}

		const surveyQuestionRepository : Repository<SurveyQuestion> = getConnection().getRepository(SurveyQuestion);
		const sqs: SurveyQuestion[] = await surveyQuestionRepository.find({
			where: {
				eventTypeId,
			},
			order: {
				surveyQuestionId: 'ASC'
			},
		});

		return sqs;
	}

	public static async getEventByAlias(alias) : Promise<FletfeetEvent>{
		const fleetFeetEventRepository: FleetFeetEventRepository = getConnection().getCustomRepository(FleetFeetEventRepository);
		const event: FletfeetEvent = await fleetFeetEventRepository.findByAlias(alias);

		if (!event) {
			throw new ApplicationError('Not found', HttpStatusCodes.NOT_FOUND);
		}

		return event;
	}

	public static async getWaiver(eventAlias) : Promise<FletfeetWaiver>{
		let eventTypeId = 1;

		if (eventAlias) {
			const fleetFeetEventRepository: FleetFeetEventRepository = getConnection().getCustomRepository(FleetFeetEventRepository);
			const event: FletfeetEvent = await fleetFeetEventRepository.findByAlias(eventAlias);

			if (!event) {
				throw new ApplicationError('Not found', HttpStatusCodes.NOT_FOUND);
			}

			eventTypeId = event.eventTypeId;
		}

		const fletfeetWaiverRepository : Repository<FletfeetWaiver> = getConnection().getRepository(FletfeetWaiver);
		const waiver = await fletfeetWaiverRepository.findOne({
			where: {
				eventTypeId,
			}
		});

		return waiver;
	}

	public static async registration ({ email, firstName, lastName, phone, rawPassword, survey, eventAlias }, lastUserIp) {
		if (!email) {
			throw new ApplicationError('Email is required');
		}

		if (!EmailValidator.validate(email)) {
			throw new ApplicationError('Wrong email');
		}

		if (!firstName) {
			throw new ApplicationError('First name is required');
		}

		if (!lastName) {
			throw new ApplicationError('Last name is required');
		}

		if (!phone) {
			throw new ApplicationError('Phone is required');
		}

		if (!eventAlias) {
			throw new ApplicationError('Event is required');
		}

		if (!rawPassword) {
			throw new ApplicationError('Password is required');
		}

		if (!passwordSchema.validate(rawPassword)) {
			throw new ApplicationError('Password can not be less than 6 characters');
		}

		let event : FletfeetEvent = null;
		const fleetFeetEventRepository: FleetFeetEventRepository = getConnection().getCustomRepository(FleetFeetEventRepository);
		event = await fleetFeetEventRepository.findByAlias(eventAlias);

		if (!event) {
			throw new ApplicationError('Event is required');
		}

		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		const inviteRepository: InviteRepository = getConnection().getCustomRepository(InviteRepository);

		const clearPhone = phoneClean(phone);
		const userByEmail = await userRepository.findByEmail(email);

		if (userByEmail) {
			throw new ApplicationError('User with this email already exists');
		}

		const password = await bcrypt.hash(rawPassword, 10);

		const user = userRepository.create({
			firstName,
			lastName,
			email: email.toLowerCase().trim(),
			password,
			phone: clearPhone,
			userTypeId: UserType.ATHLETE,
			sourceId: User.SOURCE_FLEET_FEET,
			isPolicyAccepted: false, // user should accept policy manualy
			isPaid: true,
			isEmailConfirmed: true,
		});

		const dbUser: User = await userRepository.save(user);

		await inviteRepository.add(event.planTemplate.coachId, dbUser.userId, true, event.eventId);

		if (survey) {
			const surveyAnswerRepository: SurveyAnswerRepository = getConnection().getCustomRepository(SurveyAnswerRepository);
			await surveyAnswerRepository.addList(survey, dbUser.userId);
		}

		const sessionRepository: SessionRepository = getConnection().getCustomRepository(SessionRepository);
		const session : Session = await sessionRepository.addSession(
			dbUser.userId,
			lastUserIp,
		);

		const data : IDecodedToken = {
			user_id: dbUser.userId, // eslint-disable-line
			session_id: session.sessionId // eslint-disable-line
		};
		const token : string = jwt.sign(data, env.JWT_SECRET);

		const lastActivityRepository: LastActivityRepository = getConnection().getCustomRepository(LastActivityRepository);
		await lastActivityRepository.set(dbUser.userId, LastActivityType.SIGNUP_COMPLETED);

		return {
			token,
			user: dbUser
		};
	}

	public static async pay(user: User, token: string, eventAlias?: string) : Promise<any>{
		if (!token) {
			throw new ApplicationError('Token is required');
		}

		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		const planTemplateRepository: PlanTemplateRepository = getConnection().getCustomRepository(PlanTemplateRepository);
		const inviteRepository: InviteRepository = getConnection().getCustomRepository(InviteRepository);
		const lastActivityRepository: LastActivityRepository = getConnection().getCustomRepository(LastActivityRepository);
		const fleetFeetEventRepository: FleetFeetEventRepository = getConnection().getCustomRepository(FleetFeetEventRepository);
		const surveyAnswerRepository: SurveyAnswerRepository = getConnection().getCustomRepository(SurveyAnswerRepository);

		const invite = await inviteRepository.findByAthleteId(user.userId);

		if (!invite) {
			throw new ApplicationError('Something went wrong. Contact administrator');
		}

		let event : FletfeetEvent = null;

		if (eventAlias) {
			event = await fleetFeetEventRepository.findByAlias(eventAlias);
		} else {
			event = await fleetFeetEventRepository.findById(invite.fletfeetEventId);
		}

		if (!event) {
			throw new ApplicationError('Event not found');
		}

		const surveyAnswerLevel = await surveyAnswerRepository.getLevelByUserId(user.userId);

		// Intermediate by default
		let planTemplateId = event.planTemplateId;
		if (surveyAnswerLevel) {
			const answer = surveyAnswerLevel.answer.toLowerCase().trim();
			if (answer === 'beginner' || answer.includes('starting')) {
				planTemplateId = event.beginnerPlanTemplateId;
			} else if (answer === 'advanced' || answer.includes('established')) {
				planTemplateId = event.advancePlanTemplateId;
			}
		}

		const planTemplate = await planTemplateRepository.findOne(planTemplateId || event.planTemplateId);

		const ffCoach = await userRepository.findById(planTemplate.coachId);
		if (!ffCoach) {
			throw new ApplicationError('Fleet Feet Coach not found');
		}

		const { stripeSourceId } = await StripeService.createCustomer(user, token);
		await StripeService.oneTimePayment(user, Number(event.price), event.eventId, event.name, stripeSourceId);

		await PlanService.setPlan(ffCoach, {
			athleteId: user.userId,
			planTemplateId: planTemplate.planTemplateId,
			date: event.startDate,
			minMilesPerWeek: null,
			maxMilesPerWeek: null
		});

		await lastActivityRepository.set(user.userId, LastActivityType.PLAN_ASSIGNED);

		let content;

		const sacramentoEventIds = [1];

		if (sacramentoEventIds.includes(Number(event.eventTypeId))) { // eslint-disable-line
			content = fs.readFileSync('src/emails/fleet_feet_email_confirmation.html', 'utf8');
			content = content.replace(/{{EVENT_NAME}}/g, event.name || 'Event');
			content = content.replace(/{{ATHLETE_EMAIL}}/g, user.email);
			content = content.replace(/{{COACH_EMAIL}}/g, ffCoach.email);
		} else { // it's a PNW event
			content = fs.readFileSync('src/emails/fleet_feet_email_confirmation_pnw.html', 'utf8');
		}

		const [err] = await to(Mail.sendMail(user.email, 'Fleet Feet Registration', content, 'Bird<hello@bird.coach>'));
		if (err) {
			// do nothing
		}

	}

	public static async sendListOfNewUsers() : Promise<any> {
		return getConnection().transaction(async (entityManager) => {
			const surveyAnswerRepository: SurveyAnswerRepository = entityManager.getCustomRepository(SurveyAnswerRepository);
			const surveyQuestionRepository: SurveyQuestionRepository = entityManager.getCustomRepository(SurveyQuestionRepository);
			const userRepository: UserRepository = entityManager.getCustomRepository(UserRepository);
			const payLogRepository: PayLogRepository = entityManager.getCustomRepository(PayLogRepository);

			const questions = await surveyQuestionRepository.findAll();
			const answers = await surveyAnswerRepository.getNew();

			const userIds = Array.from(new Set(answers.map((a) => a.userId)));
			const users = await userRepository.findByIds(userIds);
			const payLogs = await payLogRepository.findByUserIds(userIds);

			const allData = users.map((user) => {
				const res = {
					name: `${user.firstName} ${user.lastName}`,
					email: user.email,
					userId: user.userId,
					phone: user.phone,
					currentProgram: user.planOfAthlete && user.planOfAthlete[0] ? user.planOfAthlete[0].name : 'No',
					coachId: user.planOfAthlete && user.planOfAthlete[0] ?
						user.planOfAthlete[0].coachId :
						(user.athleteInvite && user.athleteInvite[0] ? user.athleteInvite[0].fromId : '???'),
					amountPaid: payLogs.filter((log) => log.userId === user.userId)
						.reduce((sum, cur) => sum + cur.amount, 0) / 100, // eslint-disable-line
					dateRegistered: user.createdAt.toLocaleString('en-US').split(',')[0],
				};

				for (const question of questions) {
					res[`${question.question}`] = ''; // init
				}

				const answersByUser = answers.filter((a) => a.userId === user.userId);
				for (const answer of answersByUser) {
					res[`${questions.find((q) => q.surveyQuestionId === answer.surveyQuestionId).question}`] = answer.answer;
				}

				return res;
			});

			const options = {
				fieldSeparator: ',',
				quoteStrings: '"',
				decimalSeparator: '.',
				showLabels: true,
				showTitle: false,
				title: '',
				useTextFile: false,
				useBom: false,
				useKeysAsHeaders: true,
			};

			const grouped = this._groupBy(allData, line => line.coachId);

			const coaches = await userRepository.findByIds(Array.from(grouped.keys()));

			for (const [key, data] of grouped) {
				const coach = coaches.find((c) => c.userId === key);
				let csvFile;

				if (data && data.length > 0) {
					const csvExporter = new ExportToCsv(options);
					csvFile = csvExporter.generateCsv(data, true);
				} else {
					csvFile = 'Empty';
				}

				await to(new Promise((resolve, reject) => {
					const oAuth2Client = new google.auth.OAuth2(env.GOOGLE_CLIENT_ID, env.GOOGLE_CLIENT_SECRET, null);

					oAuth2Client.setCredentials({
						'refresh_token': env.GOOGLE_REFRESH_TOKEN,
					});

					const drive = google.drive({ version: 'v3', auth: oAuth2Client });
					const date = new Date();

					const fileMetadata = {
						name: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-FleetFeet-For-Coach-${key}-${coach.firstName}-${coach.lastName}.csv`,
						parents: [env.GOOGLE_DRIVE_FF_REPORT_DIR]
					};
					const media = {
						mimeType: 'text/csv',
						body: csvFile,
					};
					drive.files.create({
						resource: fileMetadata,
						media,
						fields: 'id'
					}, function (err, file) {
						if (err) {
							reject(err);
						}

						resolve(file);
					});
				}));
			}

			// await to(surveyAnswerRepository.markAsNotNew(answers.map((a) => a.surveyAnswerId)));

			return '';
		});

	}

	private static _groupBy(list, keyGetter) {
		const map = new Map();
		list.forEach((item) => {
			const key = keyGetter(item);
			const collection = map.get(key);
			if (!collection) {
				map.set(key, [item]);
			} else {
				collection.push(item);
			}
		});
		return map;
	}
}
