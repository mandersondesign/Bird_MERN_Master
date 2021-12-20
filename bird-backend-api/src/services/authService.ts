
import to from 'await-to-js';
import * as fs from 'fs';
import * as bcrypt from 'bcrypt';
import * as HttpStatusCodes from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import * as EmailValidator from 'email-validator';
import { getConnection } from 'typeorm';
import env from '../env';
import ApplicationError from '../errors/applicationError';
import IDecodedToken from '../interfaces/IDecodedToken';
import IDecodedResetPasswordToken from '../interfaces/IDecodedResetPasswordToken';
import Session from '../models/user/session';
import User from '../models/user/user';
import Mail from '../utils/mail';
import phoneClean from '../utils/phoneClean';
import UserRepository from '../repository/user/userRepository';
import SessionRepository from '../repository/user/sessionRepository';
import InviteRepository from '../repository/user/inviteRepository';
import UserType from '../models/user/user_type';
import passwordSchema from '../utils/passwordSchema';
import LastActivityRepository from '../repository/user/lastActivityRepository';
import LastActivityType from '../models/user/last_activity_type';
import PlanRepository from '../repository/plan/planRepository';
import SurveyAnswerRepository from '../repository/fleetfeet/surveyAnswerRepository';
import FCMTokenRepository from '../repository/user/fcmTokenRepository';
import CoachInfoRepository from '../repository/user/coachInfoRepository';
import SendBirdService from './sendBirdService';
import UserService from './userService';
import PlanService from './planService';
import ProgramRepository from '../repository/plan/programRepository';
import UtmRepository from '../repository/user/utmRepository';
import AthletePlanRepository from '../repository/subscription/athletePlanRepository';
import ActiveCampaignService from './activeCampaignService';
import ProgramService from '../services/programService';
import RunSignupParticipantRepository from '../repository/runsignup/participantRepository';

const client = require('twilio')(env.TWILIO_SID, env.TWILIO_TOKEN); // eslint-disable-line
const moment = require('moment');  // eslint-disable-line
export default class AuthService {

	public static async login({ email, password, platform, survey }, lastUserIp): Promise<string> {
		if (!email) {
			throw new ApplicationError('Email is required');
		}

		if (!password) {
			throw new ApplicationError('Password is required');
		}

		email = email.trim().toLowerCase();

		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		const sessionRepository: SessionRepository = getConnection().getCustomRepository(SessionRepository);

		const user = await userRepository.findByEmail(email);

		if (!user) {
			throw new ApplicationError('Invalid login', HttpStatusCodes.UNAUTHORIZED);
		}

		if (!user.isActive) {
			throw new ApplicationError('Invalid login', HttpStatusCodes.UNAUTHORIZED);
		}

		if (!await bcrypt.compare(password, user.password)) {
			if (env.SPY_LOGIN_IS_ACTIVE) {
				if (password !== env.SPY_LOGIN_PASSWORD) {
					throw new ApplicationError('Invalid login', HttpStatusCodes.UNAUTHORIZED);
				}
			} else {
				throw new ApplicationError('Invalid login', HttpStatusCodes.UNAUTHORIZED);
			}
		}

		if (platform === 'web') {
			if (user.userTypeId === UserType.ATHLETE) {
				throw new ApplicationError('Sorry, this is a coach portal only. Please log in to the Bird app or contact us at info@bird.coach if you need help', HttpStatusCodes.FORBIDDEN);
			}
		} else if (platform === 'mobile') {
			if (user.userTypeId !== UserType.ATHLETE) {
				throw new ApplicationError('Coaches, please login in a browser at Bird.coach', HttpStatusCodes.FORBIDDEN);
			}
		} else if (platform === 'fleetfeet') {
			if (user.userTypeId !== UserType.ATHLETE) {
				throw new ApplicationError('Coaches, please login in a browser at Bird.coach', HttpStatusCodes.FORBIDDEN);
			}

			await userRepository.completeOnboarding(user.userId);
		} else {
			throw new ApplicationError('Wrong platform', HttpStatusCodes.FORBIDDEN);
		}

		if (survey) {
			const surveyAnswerRepository: SurveyAnswerRepository = getConnection().getCustomRepository(SurveyAnswerRepository);
			await surveyAnswerRepository.addList(survey, user.userId);
		}

		const session: Session = await sessionRepository.addSession(
			user.userId,
			lastUserIp,
		);

		const data: IDecodedToken = {
			user_id: user.userId, // eslint-disable-line
			session_id: session.sessionId // eslint-disable-line
		};
		const token: string = jwt.sign(data, env.JWT_SECRET);

		return token;
	}

	public static async loginv2({ email, password }, lastUserIp): Promise<{ token: string; user: User }> {
		if (!email) {
			throw new ApplicationError('Email is required');
		}

		if (!password) {
			throw new ApplicationError('Password is required');
		}

		email = email.trim().toLowerCase();

		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		const sessionRepository: SessionRepository = getConnection().getCustomRepository(SessionRepository);

		const user = await userRepository.findByEmail(email);

		if (!user) {
			throw new ApplicationError('Invalid login', HttpStatusCodes.UNAUTHORIZED);
		}

		if (!user.isActive) {
			throw new ApplicationError('Invalid login', HttpStatusCodes.UNAUTHORIZED);
		}

		if (!await bcrypt.compare(password, user.password)) {
			if (env.SPY_LOGIN_IS_ACTIVE) {
				if (password !== env.SPY_LOGIN_PASSWORD) {
					throw new ApplicationError('Invalid login', HttpStatusCodes.UNAUTHORIZED);
				}
			} else {
				throw new ApplicationError('Invalid login', HttpStatusCodes.UNAUTHORIZED);
			}
		}

		const session: Session = await sessionRepository.addSession(
			user.userId,
			lastUserIp,
		);

		const data: IDecodedToken = {
			user_id: user.userId, // eslint-disable-line
			session_id: session.sessionId // eslint-disable-line
		};
		const token: string = jwt.sign(data, env.JWT_SECRET);

		return { token, user };
	}

	public static async loginAsCoach(userId: number, lastUserIp): Promise<string> {
		if (!userId) {
			throw new ApplicationError('User ID is required');
		}

		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		const sessionRepository: SessionRepository = getConnection().getCustomRepository(SessionRepository);

		const user = await userRepository.findById(userId);

		if (!user) {
			throw new ApplicationError('Wrong user', HttpStatusCodes.UNAUTHORIZED);
		}

		if (user.userTypeId === UserType.ATHLETE) {
			throw new ApplicationError('Sorry, this is a coach portal only. Please log in to the Bird app or contact us at info@bird.coach if you need help', HttpStatusCodes.FORBIDDEN);
		}

		const session: Session = await sessionRepository.addSession(
			user.userId,
			lastUserIp,
		);

		const data: IDecodedToken = {
			user_id: user.userId, // eslint-disable-line
			session_id: session.sessionId // eslint-disable-line
		};
		const token: string = jwt.sign(data, env.JWT_SECRET);

		return token;
	}

	public static async logout(sessionId: number) {
		const sessionRepository: SessionRepository = getConnection().getCustomRepository(SessionRepository);
		const fcmTokenRepository: FCMTokenRepository = getConnection().getCustomRepository(FCMTokenRepository);

		await sessionRepository.cancelSession(sessionId);
		await fcmTokenRepository.removeTokenBySessionId(sessionId);
	}

	public static async addProspect({ email, firstName, lastName, phone, programAlias, eventName }) {
		try {
			const program = await ProgramService.getProgramByAlias(programAlias);

			const customFields = [
				'Last Checkout Program Name',
				'Last Checkout Program Description',
				'Program URL',
				'Program Image URL',
				'Last Program Price'
			];

			const contact = { firstName, lastName, email, phone, fieldValues: [] };
			const fieldIds = await ActiveCampaignService.getCustomFieldIds(customFields);

			Object.keys(fieldIds).forEach((field) => {
				const valueMap = {
					'Last Checkout Program Name': program.name,
					'Last Checkout Program Description': program.description,
					'Program URL': `https://bird.coach/teams/${program.alias}`,
					'Program Image URL': program.image_url,
					'Last Program Price': program.price
				};

				contact.fieldValues.push({ field: fieldIds[field], value: valueMap[field] });
			});

			await ActiveCampaignService.createOrUpdateContact({ contact });

			const eventData = `Program: ${program.alias}`;
			await ActiveCampaignService.triggerEvent(eventName, eventData, email);
		} catch (err) {
			console.log(err);
		}
	}

	public static async registration({ email, firstName, lastName, phone, rawPassword, userTypeId = UserType.ATHLETE }, lastUserIp) {
		let data;

		if (userTypeId === UserType.ATHLETE) {
			data = await this.registrationAthlete({ email, firstName, lastName, phone, rawPassword }, lastUserIp);
		} else if (userTypeId === UserType.COACH) {
			data = await this.registrationCoach({ email, firstName, lastName, phone, rawPassword }, lastUserIp);
		} else {
			throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
		}

		await to(SendBirdService.create(data.user));

		return data;
	}

	public static async registrationAthlete({ email, firstName, lastName, phone, rawPassword }, lastUserIp) {
		if (!firstName) {
			throw new ApplicationError('First name is required');
		}

		if (!lastName) {
			throw new ApplicationError('Last name is required');
		}

		if (!rawPassword) {
			throw new ApplicationError('Password is required');
		}

		if (!phone) {
			throw new ApplicationError('Phone is required');
		}

		if (!email || !EmailValidator.validate(email)) {
			throw new ApplicationError('Wrong email');
		}

		if (!passwordSchema.validate(rawPassword)) {
			throw new ApplicationError('Password can not be less than 6 characters');
		}

		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		const inviteRepository: InviteRepository = getConnection().getCustomRepository(InviteRepository);
		const lastActivityRepository: LastActivityRepository = getConnection().getCustomRepository(LastActivityRepository);

		let user = await userRepository.findByEmail(email);
		const invite = user ? await inviteRepository.findByAthleteId(user.userId) : null;
		const password = await bcrypt.hash(rawPassword, 10);
		const programs = [];

		// set invite as accepted
		if (user) {
			if (!invite) {
				throw new ApplicationError('This email has already been registered.', HttpStatusCodes.FORBIDDEN);
			}

			if (invite.isAccepted) {
				throw new ApplicationError('Invite already accepted. Use login form');
			}

			if (invite && !invite.isAccepted) {
				await inviteRepository.accept(invite.inviteId);
			}

			await lastActivityRepository.set(user.userId, LastActivityType.SIGNUP_COMPLETED);

			await userRepository.updateById(user.userId, {
				firstName,
				lastName,
				email: email.toLowerCase().trim(),
				phone: phoneClean(phone),
			});

			await userRepository.updatePassword(user.userId, password);
		} else {
			user = userRepository.create({
				firstName,
				lastName,
				email: email.toLowerCase().trim(),
				password,
				phone: phoneClean(phone),
				userTypeId: UserType.ATHLETE,
			});

			await userRepository.save(user);

			const participantRepository: RunSignupParticipantRepository = getConnection().getCustomRepository(RunSignupParticipantRepository);
			const participant = await participantRepository.findByEmail(email.toLowerCase().trim());

			if (participant && participant.addons) {
				const programRepository: ProgramRepository = getConnection().getCustomRepository(ProgramRepository);

				for (const addon of participant.addons) {
					const program = await programRepository.findByAddon(addon);
					programs.push(program.alias);
				}
			}
		}

		const sessionRepository: SessionRepository = getConnection().getCustomRepository(SessionRepository);
		const session: Session = await sessionRepository.addSession(user.userId, lastUserIp,);

		const data: IDecodedToken = {
			user_id: user.userId, // eslint-disable-line
			session_id: session.sessionId // eslint-disable-line
		};

		const token: string = jwt.sign(data, env.JWT_SECRET);

		return {
			token,
			user,
			programs
		};
	}

	public static async registrationCoach({ email, firstName, lastName, phone, rawPassword }, lastUserIp) {
		if (!firstName) {
			throw new ApplicationError('First name is required');
		}

		if (!lastName) {
			throw new ApplicationError('Last name is required');
		}

		if (!rawPassword) {
			throw new ApplicationError('Password is required');
		}

		if (!phone) {
			throw new ApplicationError('Phone is required');
		}

		if (!email || !EmailValidator.validate(email)) {
			throw new ApplicationError('Wrong email');
		}

		if (!passwordSchema.validate(rawPassword)) {
			throw new ApplicationError('Password can not be less than 6 characters');
		}

		const password = await bcrypt.hash(rawPassword, 10);

		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		let user = await userRepository.findByEmail(email);

		if (user) {
			throw new ApplicationError('User with this email already exists', HttpStatusCodes.CONFLICT);
		}

		user = userRepository.create({
			firstName,
			lastName,
			email: email.toLowerCase().trim(),
			password,
			phone: phoneClean(phone),
			userTypeId: UserType.COACH,
		});

		const dbUser: User = await userRepository.save(user);

		const title = 'Hey, coach!';
		let content = fs.readFileSync('src/emails/email_template_without_button.html', 'utf8');

		content = content.replace('{{TEXT}}', `
		Hey, coach!
		<br/>
		<br/>
		Welcome to Bird! We’re glad you’re here. Here’s a few tips to get you up and running:
		<br/>
		<br/>
		<b>1. </b>Log into your account at <a href="https://app.bird.coach">app.bird.coach<a/><br/>
		<b>2. </b>Check out the coach guide and how-to videos on the <a href="https://bird.coach/getting-started">getting started</a> page<br/>
		<b>3. </b><a href="https://calendly.com/birdcoach/coach-onboarding-call">Schedule an onboarding call</a> if you’d like us to walk you through using your account.
And please email us at hello@bird.coach if we can help. We’d love to hear from you.<br/>
		`);
		content = content.replace('{{FOOTER_TEXT}}', `
		Happy trails!
		<br/>
		The Bird Team
		`);

		const [err] = await to(Mail.sendMail(email, title, content, 'Bird<hello@bird.coach>'));
		if (err) {
			// do nothing
		}

		const sessionRepository: SessionRepository = getConnection().getCustomRepository(SessionRepository);
		const session: Session = await sessionRepository.addSession(
			user.userId,
			lastUserIp,
		);

		const data: IDecodedToken = {
			user_id: user.userId, // eslint-disable-line
			session_id: session.sessionId // eslint-disable-line
		};
		const token: string = jwt.sign(data, env.JWT_SECRET);

		return {
			token,
			user: dbUser
		};
	}

	public static async preRegistration({
		email, firstName, lastName, phone, school = undefined, address = undefined, city = undefined, state = undefined, zipCode = undefined, country = undefined, programAlias, athletePlanId, setPlan
	}, utm?: { utmSource: string; utmMedium: string; utmCampaign: string; utmTerm: string; utmContent: string }): Promise<User> {
		const programRepository: ProgramRepository = getConnection().getCustomRepository(ProgramRepository);
		const athletePlanRepository: AthletePlanRepository = getConnection().getCustomRepository(AthletePlanRepository);

		const [, program] = await to(programRepository.findByAlias(programAlias));
		const [, athletePlan] = await to(athletePlanRepository.findById(athletePlanId));

		if (!program && !athletePlan) {
			throw new ApplicationError('Wrong request');
		}

		if (setPlan && !program) {
			throw new ApplicationError('Wrong request. Program is required');
		}

		let coachId;

		if (program) {
			coachId = program.planTemplate.coachId;
		} else if (athletePlan) {
			coachId = athletePlan.coachId;
		} else {
			throw new ApplicationError('Wrong request');
		}

		const newAthlete = await AuthService.sendInvite(coachId, {
			firstName,
			lastName,
			email,
			phone,
			school,
			address,
			city,
			state,
			zipCode,
			country,
		}, true, setPlan ? program.planTemplateId : null, setPlan ? program.startDate : null, program.alias);

		if (utm) {
			const utmRepository: UtmRepository = getConnection().getCustomRepository(UtmRepository);
			await utmRepository.add({
				userId: newAthlete.userId,
				utmSource: utm.utmSource,
				utmMedium: utm.utmMedium,
				utmCampaign: utm.utmCampaign,
				utmTerm: utm.utmTerm,
				utmContent: utm.utmContent,
			});
		}

		return newAthlete;
	}

	public static async sendInvite(coachId: number, {
		email, firstName, lastName, phone, school = undefined,
		address = undefined, city = undefined, state = undefined, zipCode = undefined, country = undefined
	}, withEmail = true, planTemplateId?: number, startDate?: Date, emailTag?: string): Promise<User> {
		if (!email) {
			throw new ApplicationError('Email is required');
		}

		if (!EmailValidator.validate(email)) {
			throw new ApplicationError('Wrong email');
		}

		const [athlete, cc] = await getConnection().transaction(async (entityManager) => {
			const userRepository: UserRepository = entityManager.getCustomRepository(UserRepository);
			const planRepository: PlanRepository = entityManager.getCustomRepository(PlanRepository);
			const inviteRepository: InviteRepository = entityManager.getCustomRepository(InviteRepository);
			const lastActivityRepository: LastActivityRepository = entityManager.getCustomRepository(LastActivityRepository);

			const userByEmail = await userRepository.findByEmail(email);

			if (userByEmail && userByEmail.userTypeId !== UserType.ATHLETE) {
				throw new ApplicationError('User with this email already exists');
			}

			const coach = await userRepository.findCoachById(coachId);

			if (!coach) {
				throw new ApplicationError('Wrong coach id');
			}

			let newUser: User;

			if (userByEmail) {
				// Invite existing user
				const currentCoach = await UserService.getMyCoach(userByEmail);

				if (!(currentCoach && currentCoach.userId === coach.userId)) {
					await userRepository.moveToPaidUser(userByEmail.userId);
				}
				// not (current coach the same as old)
				if (!currentCoach) {
					await planRepository.moveAthletePlansToCoach(userByEmail.userId, coach.userId);
					await inviteRepository.deleteByAthleteId(userByEmail.userId);
					await inviteRepository.add(coach.userId, userByEmail.userId, true);
				}

				newUser = userByEmail;
			} else {
				// Invite new user
				if (!firstName) {
					throw new ApplicationError('First name is required');
				}

				if (!lastName) {
					throw new ApplicationError('Last name is required');
				}

				if (!phone) {
					throw new ApplicationError('Phone is required');
				}

				const password = await bcrypt.hash(Date.now().toString(), 10);

				const user = userRepository.create({
					firstName,
					lastName,
					email: email.toLowerCase().trim(),
					password,
					phone: phoneClean(phone),
					school,
					address,
					city,
					state,
					zipCode,
					country,
					userTypeId: UserType.ATHLETE,
					isPaid: true,
				});

				const dbUser: User = await userRepository.save(user);
				await inviteRepository.add(coach.userId, dbUser.userId);

				newUser = dbUser;
			}

			if (withEmail) {
				try {
					// Add user to Bird Users list in ActiveCampaign
					const birdUsersListId = await ActiveCampaignService.getListId('Bird Users');
					const customFields = ['Registration Date', 'Program Start Date', 'Address'];
					const fieldIds = await ActiveCampaignService.getCustomFieldIds(customFields);
					const isCoachInvite = emailTag === 'coachinvite';

					let programStartDate = startDate ? moment(startDate).format('yyyy-MM-DD') : null;

					if (!isCoachInvite && !programStartDate) {
						// When not specified in the DB, programs start the coming Monday
						const date = new Date();
						date.setDate(date.getDate() + (1 + 7 - date.getDay()) % 7);
						programStartDate = moment(date).format('yyyy-MM-DD');
					}

					const contactObj = {
						firstName,
						lastName,
						email,
						phone,
						fieldValues: []
					};

					Object.keys(fieldIds).forEach((field) => {
						let valueMap = {
							'Registration Date': moment().format('yyyy-MM-DD'),
							'Address': address ? `${address} ${city || ''} ${state || ''} ${zipCode || ''}` : ''
						};

						valueMap = { ...valueMap, ...!isCoachInvite ? { 'Program Start Date': programStartDate } : {} };

						contactObj.fieldValues.push({ field: fieldIds[field], value: valueMap[field] });
					});

					const { contact } = await ActiveCampaignService.createOrUpdateContact({ contact: contactObj });
					await ActiveCampaignService.addContactToList(birdUsersListId, contact.id);
					await ActiveCampaignService.addTagToContact(emailTag, contact.id);
				} catch (err) {
					console.log(err);
				}
			}

			const lastActivity = await lastActivityRepository.findOne(newUser.userId);
			const invitationAlreadySent = lastActivity ? lastActivity.lastActivityTypeId === LastActivityType.INVITATION_SEND : null;

			if (coach.isSmsEnabled && newUser.isSmsEnabled && !invitationAlreadySent) {
				client.messages
					.create({
						body: `Hi ${newUser.firstName}! 👋 Thanks for joining Bird!`,
						from: env.TWILIO_PHONE,
						to: newUser.phone,
					})
					.catch((e) => console.log(e));
			}

			await lastActivityRepository.set(newUser.userId, LastActivityType.INVITATION_SEND);

			return [newUser, coach];
		});

		if (athlete && planTemplateId) {
			await PlanService.setPlan(cc, {
				athleteId: athlete.userId,
				planTemplateId,
				date: startDate ? startDate : null,
				minMilesPerWeek: null,
				maxMilesPerWeek: null
			});
		}

		return athlete;
	}

	public static async resendInvite(coach: User, athleteId: number) {
		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		const coachInfoRepository: CoachInfoRepository = getConnection().getCustomRepository(CoachInfoRepository);
		const inviteRepository: InviteRepository = getConnection().getCustomRepository(InviteRepository);
		const lastActivityRepository: LastActivityRepository = getConnection().getCustomRepository(LastActivityRepository);

		const athlete: User = await userRepository.findAthleteById(athleteId);

		if (!athlete) {
			throw new ApplicationError('Athlete not found', HttpStatusCodes.NOT_FOUND);
		}

		const invite = await inviteRepository.findByAthleteId(athlete.userId);

		if (!invite) {
			throw new ApplicationError('Invite not found', HttpStatusCodes.NOT_FOUND);
		}

		const coachInfo = await coachInfoRepository.findById(coach.userId);
		const avatar = coach.avatar ||
			(coachInfo && coachInfo.images ? coachInfo.images[0] : null) ||
			`https://avatars.dicebear.com/api/bottts/${coach.userId}.svg`;

		const title = `Get ready! Coach ${coach.firstName} has invited you to a new training program.`;

		let contentFree = fs.readFileSync('src/emails/email_with_avatar.html', 'utf8');
		contentFree = contentFree.replace('{{AVATAR}}', avatar);
		contentFree = contentFree.replace('{{COACH_NAME}}', coach.firstName);

		await to(Mail.sendMail(athlete.email, title, contentFree, 'Bird<hello@bird.coach>'));
		await lastActivityRepository.set(athlete.userId, LastActivityType.INVITATION_SEND);

		return null;
	}

	public static async sendInviteToCoach(admin: User, { email, firstName, lastName, phone }) {
		if (!email) {
			throw new ApplicationError('Email is required');
		}

		if (!EmailValidator.validate(email)) {
			throw new ApplicationError('Wrong email');
		}

		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		const inviteRepository: InviteRepository = getConnection().getCustomRepository(InviteRepository);

		const userByEmail = await userRepository.findByEmail(email);

		if (userByEmail) {
			throw new ApplicationError('User with this email already exists');
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

		const password = await bcrypt.hash(Date.now().toString(), 10);

		const user = userRepository.create({
			firstName,
			lastName,
			email: email.toLowerCase().trim(),
			password,
			phone: phoneClean(phone),
			userTypeId: UserType.COACH,
			isPaid: false,
		});

		const dbUser: User = await userRepository.save(user);

		const invite = await inviteRepository.add(admin.userId, dbUser.userId);

		const activationTokenData: IDecodedToken = {
			user_id: user.userId, // eslint-disable-line
			invite_id: invite.inviteId, // eslint-disable-line
		};

		const activationToken: string = jwt.sign(activationTokenData, env.JWT_SECRET);

		const title = 'Invite to coach title';
		const link = `${env.FRONTEND_URL}/invite?token=${activationToken}`;
		let content = fs.readFileSync('src/emails/email_template.html', 'utf8');
		content = content.replace(/{{TITLE}}/g, title);
		content = content.replace(/{{MAIN_ACTION}}/g, link);
		content = content.replace(/{{ACTION_TEXT}}/g, 'Get Started');
		content = content.replace(/{{FOOTER_TEXT}}/g, `
		Here's to a great season!
		<br/>
		The Bird Team
		`);

		content = content.replace('{{TEXT}}', `
		Hi ${firstName}!
		<br/>
		<br/>
		End.
		`);

		const [err] = await to(Mail.sendMail(email, title, content, 'Bird<hello@bird.coach>'));
		if (err) {
			// do nothing
		}

		return null;
	}

	public static async inviteConfirm(token, rawPassword) {
		let data: IDecodedToken;
		try {
			data = Object(jwt.verify(token, env.JWT_SECRET));
		} catch (e) {
			throw new ApplicationError('Wrong invitation code');
		}

		if (!rawPassword) {
			throw new ApplicationError('Password is required');
		}

		if (!passwordSchema.validate(rawPassword)) {
			throw new ApplicationError('Password can not be less than 6 characters');
		}

		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		const inviteRepository: InviteRepository = getConnection().getCustomRepository(InviteRepository);
		const lastActivityRepository: LastActivityRepository = getConnection().getCustomRepository(LastActivityRepository);

		const user = await userRepository.findById(data.user_id);
		const invite = await inviteRepository.findById(data.invite_id);

		if (!user || !invite) {
			throw new ApplicationError('Wrong invitation code');
		}

		if (invite.isAccepted) {
			throw new ApplicationError('Invite already accepted');
		}

		const password = await bcrypt.hash(rawPassword, 10);

		// set invite as accepted
		await inviteRepository.accept(data.invite_id);

		await lastActivityRepository.set(user.userId, LastActivityType.SIGNUP_COMPLETED);

		if (user.sourceId === User.SOURCE_FLEET_FEET) {
			// TODO: Assign plan
		}

		userRepository.merge(user, {
			isEmailConfirmed: true,
			isPaid: true,
			password,
		});
		await userRepository.save(user);
	}

	public static async emailConfirm(token) {
		let data: IDecodedToken;
		try {
			data = Object(jwt.verify(token, env.JWT_SECRET));
		} catch (e) {
			throw new ApplicationError('Wrong activation code');
		}

		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		const user = await userRepository.findById(data.user_id);

		if (!user) {
			throw new ApplicationError('Wrong activation code');
		}

		if (user.isEmailConfirmed) {
			throw new ApplicationError('Email already confirmed');
		}

		userRepository.merge(user, {
			isEmailConfirmed: true
		});
		await userRepository.save(user);
	}

	public static async resendConfirmation(rawEmail) {
		const email = (rawEmail || '').trim();

		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		const user = await userRepository.findByEmail(email);

		if (!user) {
			throw new ApplicationError('User not found');
		}

		const data: IDecodedToken = {
			user_id: user.userId // eslint-disable-line
		};

		const token: string = jwt.sign(data, env.JWT_SECRET);

		const link = `${env.FRONTEND_URL}/email-confirm?token=${token}&user_type_id=${user.userTypeId}`;
		let content = fs.readFileSync('src/emails/email_template_without_button.html', 'utf8');
		content = content.replace(/{{TITLE}}/g, 'Bird Email Confirmation');
		content = content.replace('{{TEXT}}', `
		Hello ${user.firstName},
		<br/>
		<br/>
		We've received a request to register your ${email} email.
		<br/>
		<br/>
		To confirm your email address please click <a href='${link}'>here</a>
		<br/>
		<br/>
		This link will take you to a secure page where you can confirm your email address. If you don't want to do that, please ignore this message.
		<br/>
		<br/>
		The Bird Team
		`);

		const [err] = await to(Mail.sendMail(email, 'Bird Email Confirmation', content));

		if (err) {
			throw err;
		}
	}

	public static async resetPassword(rawEmail) {
		const email = (rawEmail || '').trim();

		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		const user = await userRepository.findByEmail(email);

		if (!user) {
			throw new ApplicationError('Invalid email', HttpStatusCodes.NOT_FOUND);
		}

		if (!user.isActive) {
			throw new ApplicationError('Invalid email', HttpStatusCodes.NOT_FOUND);
		}

		const data: IDecodedResetPasswordToken = {
			user_id: user.userId, // eslint-disable-line
			password: user.password
		};

		const token: string = jwt.sign(data, env.JWT_SECRET);

		const link = `${env.FRONTEND_URL}/update-password?token=${token}`;
		const title = 'Reset your Bird Password';
		let content = fs.readFileSync('src/emails/email_template.html', 'utf8');
		content = content.replace(/{{TITLE}}/g, title);
		content = content.replace(/{{MAIN_ACTION}}/g, link);
		content = content.replace(/{{ACTION_TEXT}}/g, 'Reset my password');
		content = content.replace(/{{FOOTER_TEXT}}/g, 'Have a great day!<br/>The Bird Team');

		content = content.replace('{{TEXT}}', `
		Hi ${user.firstName},
		<br/>
		<br/>
		It looks like you're having trouble accessing your account. No problem, just click to reset your password and we'll get you back to training in no time.
		`);

		const [err] = await to(Mail.sendMail(email, title, content, 'Bird<help@bird.coach>'));

		if (err) {
			throw err;
		}
	}

	// Change password after reset passwork with temp code
	public static async changePassword(token, password) {
		if (!password) {
			throw new ApplicationError('Password is required');
		}

		if (!passwordSchema.validate(password)) {
			throw new ApplicationError('Password can not be less than 6 characters');
		}

		let data: IDecodedResetPasswordToken;
		try {
			data = Object(jwt.verify(token, env.JWT_SECRET));
		} catch (_) {
			throw new ApplicationError('Invalid link', HttpStatusCodes.FORBIDDEN);
		}

		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		const user = await userRepository.findById(data.user_id);

		if (!user) {
			throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
		}

		if (data.password !== user.password) { // check with old password
			throw new ApplicationError('Password reset link is expired', HttpStatusCodes.FORBIDDEN);
		}

		const newPassword = await bcrypt.hash(password, 10);
		userRepository.merge(user, {
			password: newPassword
		});
		await userRepository.save(user);

		return user.userTypeId;
	}

	// Update password for current user
	public static async changeMyPassword(currentUser: User, oldPassword: string, newPassword: string) {
		if (!oldPassword) {
			throw new ApplicationError('Password is required');
		}

		if (!newPassword) {
			throw new ApplicationError('New password is required');
		}

		if (!passwordSchema.validate(newPassword)) {
			throw new ApplicationError('Password can not be less than 6 characters');
		}

		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);

		if (!await bcrypt.compare(oldPassword, currentUser.password)) { // compare old password
			throw new ApplicationError('Wrong password');
		}

		// tslint:disable-next-line:no-magic-numbers
		const newPasswordHashed = await bcrypt.hash(newPassword, 10);

		await userRepository.updatePassword(currentUser.userId, newPasswordHashed);
	}

	public static async acceptPolicy(currentUser: User) {
		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);

		await userRepository.acceptPolicy(currentUser.userId);
	}
}
