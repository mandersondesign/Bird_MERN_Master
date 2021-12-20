
import { getConnection, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as HttpStatusCodes from 'http-status-codes';
import * as EmailValidator from 'email-validator';
import UserInfo from '../models/user/user_info';
import UserRepository from '../repository/user/userRepository';
import User from '../models/user/user';
import UserType from '../models/user/user_type';
import ApplicationError from '../errors/applicationError';
import passwordSchema from '../utils/passwordSchema';
import PlanRepository from '../repository/plan/planRepository';
import * as fs from 'fs';
import * as aws from 'aws-sdk';
import env from '../env';
import to from 'await-to-js';
import PlanService from './planService';
import Mail from '../utils/mail';
import phoneClean from '../utils/phoneClean';
import InviteRepository from '../repository/user/inviteRepository';
import LastActivityRepository from '../repository/user/lastActivityRepository';
import LastActivityType from '../models/user/last_activity_type';
import CoachInfoRepository from '../repository/user/coachInfoRepository';
import SubscriptionService from './subscriptionService';
import CoachPlanToUserRepository from '../repository/subscription/coachPlanToUserRepository';
import { ExportToCsv } from 'export-to-csv';
import SendBirdService from './sendBirdService';
import PushNotificationService from './pushNotificationService';

const s3 = new aws.S3({
	apiVersion: '2006-03-01',
});

const MAX_LIMIT = 1000;

const TIME_REG_EXP = new RegExp(/^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/);

const client = require('twilio')(env.TWILIO_SID, env.TWILIO_TOKEN); // eslint-disable-line

export default class UserService {

	public static async patchUserInfo(currentUser: User, {
		eventId,
		eventTypeId, // int
		raceName, // string
		comment, // text
		levelId,
		dateOfRace, // format: "2020-03-23"
		pastExperienceId,
		milesPerWeekId,
		longDistanceId,
		personalGoalId,
		goalType,
		goalTime,
		days, // format: [1, 3, 5, 6, 7]
		personalRecords,
		customQuestions,
	}, isFirstTime: boolean) {
		const userInfoRepository: Repository<UserInfo> = getConnection().getRepository(UserInfo);
		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		const lastActivityRepository: LastActivityRepository = getConnection().getCustomRepository(LastActivityRepository);

		let userInfo: UserInfo = await userInfoRepository.findOne({
			user: currentUser,
		});

		if (!userInfo) {
			// create
			const aD = userInfoRepository.create({
				user: currentUser
			});

			userInfo = await userInfoRepository.save(aD);
		}

		// string
		if (personalGoalId) {
			userInfoRepository.merge(userInfo, {
				importantGoalId: personalGoalId,
			});
		}

		// 1 = 0..5, 2 = 5..10, 3 = 10+
		if (longDistanceId) {
			userInfoRepository.merge(userInfo, {
				longDistanceId,
			});
		}

		// 1 = 0..10, 2 = 10..20, 3 = 20+
		if (milesPerWeekId) {
			userInfoRepository.merge(userInfo, {
				milesPerWeekId,
			});
		}

		// 1 - no, 2 - once, 3 - many
		if (pastExperienceId) {
			userInfoRepository.merge(userInfo, {
				pastExperienceId,
			});
		}

		// format: 2019-01-01
		if (dateOfRace) {
			userInfoRepository.merge(userInfo, {
				dateOfRace: new Date(`${dateOfRace}T00:00:00`),
			});
		}

		// time hh:mm:ss
		if (goalTime) {
			if (!TIME_REG_EXP.test(goalTime)) {
				throw new ApplicationError('Wrong time format for goal time');
			}

			userInfoRepository.merge(userInfo, {
				goalTime,
			});
		}

		if (goalType) {
			userInfoRepository.merge(userInfo, {
				goalType,
			});
		}

		// time hh:mm:ss
		if (personalRecords.k_five) {
			if (!TIME_REG_EXP.test(personalRecords.k_five)) {
				throw new ApplicationError('Wrong time format for 5k record');
			}

			userInfoRepository.merge(userInfo, {
				current5kRecord: personalRecords.k_five,
			});
		}

		// time hh:mm:ss
		if (personalRecords.k_ten) {
			if (!TIME_REG_EXP.test(personalRecords.k_ten)) {
				throw new ApplicationError('Wrong time format for 10k record');
			}

			userInfoRepository.merge(userInfo, {
				current10kRecord: personalRecords.k_ten,
			});
		}

		// time hh:mm:ss
		if (personalRecords.half_marathon) {
			if (!TIME_REG_EXP.test(personalRecords.half_marathon)) {
				throw new ApplicationError('Wrong time format for half marathon record');
			}

			userInfoRepository.merge(userInfo, {
				currentHalfMarathonRecord: personalRecords.half_marathon,
			});
		}

		// time hh:mm:ss
		if (personalRecords.marathon) {
			if (!TIME_REG_EXP.test(personalRecords.marathon)) {
				throw new ApplicationError('Wrong time format for marathon record');
			}

			userInfoRepository.merge(userInfo, {
				currentMarathonRecord: personalRecords.marathon,
			});
		}

		if (personalRecords) {
			delete personalRecords.k_five;
			delete personalRecords.k_ten;
			delete personalRecords.half_marathon;
			delete personalRecords.marathon;

			userInfoRepository.merge(userInfo, {
				personalRecords,
			});
		}

		if (customQuestions) {
			userInfoRepository.merge(userInfo, {
				customQuestions,
			});
		}

		// [1,2,7]
		if (days) {
			userInfoRepository.merge(userInfo, {
				days,
			});
		}

		if (eventId) {
			userInfoRepository.merge(userInfo, {
				eventId,
				isCompleted: true,
			});
		}

		if (eventTypeId) {
			userInfoRepository.merge(userInfo, {
				eventTypeId,
			});
		}

		if (raceName && eventTypeId === 1) {
			userInfoRepository.merge(userInfo, {
				raceName,
			});
		}

		if (levelId) {
			userInfoRepository.merge(userInfo, {
				levelId,
			});
		}

		if (comment) {
			const MAX_COMMENT = 200;
			if (comment.split(' ').length > MAX_COMMENT) {
				throw new ApplicationError(`Comment should be less than ${MAX_COMMENT} words`);
			}
			userInfoRepository.merge(userInfo, {
				comment,
			});
		}

		if (isFirstTime && !currentUser.isOnboardingCompleted) {
			await userRepository.completeOnboarding(currentUser.userId);
			await lastActivityRepository.set(userInfo.userId, LastActivityType.ONBOARDING_COMPLETED);
		}

		await userInfoRepository.save(userInfo);

		if (isFirstTime) {
			return;
		}

		const planRepository: PlanRepository = getConnection().getCustomRepository(PlanRepository);
		const athletePlan = await planRepository.getLastPlanByAthlete(currentUser.userId);

		if (athletePlan) {
			return;
		}

		// Assign plan after onboarding
		if (!currentUser.isPaid) {
			// it's free athlete => assign to recommended plan

			const plan = await PlanService.getRecommendedPlan(currentUser, {
				eventId,
				pastExperienceId,
				milesPerWeekId,
				longDistanceId,
			});

			await PlanService.setPlan(currentUser, {
				athleteId: currentUser.userId,
				planTemplateId: plan.planTemplateId,
				date: null,
				minMilesPerWeek: null,
				maxMilesPerWeek: null
			});
		} else {
			// it's paid athlete => send notification to coach
			const inviteRepository: InviteRepository = getConnection().getCustomRepository(InviteRepository);
			const invite = await inviteRepository.findByAthleteId(currentUser.userId);

			let content = fs.readFileSync('src/emails/email_template_without_button.html', 'utf8');
			content = content.replace(/{{TITLE}}/g, 'Onboarding Completed');
			content = content.replace('{{TEXT}}', `
				Hi ${invite.from.firstName},
				<br/>
				<br/>
				Your athlete ${invite.to.firstName} ${invite.to.lastName} has just completed their profile.
				You can now see their information under "Unassigned Athletes" and begin customizing their training plan.
				<br/>
				If you have any questions, let us know at help@bird.coach.
			`);
			content = content.replace(/{{FOOTER_TEXT}}/g, 'Here\'s to a great season!<br/>The Bird Team');

			const [err] = await to(Mail.sendMail(invite.from.email, 'Onboarding Completed', content, 'Bird<hello@bird.coach>'));

			if (err) {
				throw err;
			}

			if (invite.from.isSmsEnabled && currentUser.isSmsEnabled) {
				client.messages
					.create({
						body: `Hi ${currentUser.firstName}, it's Bird! 👋🏻\n\n` +
							`Congrats on starting a training program with coach ${invite.from.firstName}. We’ll let you know as soon as your plan is ready to use.\n\n` +
							`During your plan, we’ll text you to collect feedback on your workouts. Your responses really help your coach stay in touch and monitor your progress.\n\n` + // eslint-disable-line
							'That’s it, have fun out there! 🏃🏻‍♀️🏃🏽‍♂️',
						from: env.TWILIO_PHONE,
						to: currentUser.phone,
					})
					.catch((e) => console.log(e));
			}
		}

	}
	public static async findByEmail(userEmail: string) {
		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);

		const user: User = await userRepository.findOne({
			where: {
				email: userEmail,
			},
		});

		return user;
	}
	public static async getUserInfo(userId: number) {
		const userInfoRepository: Repository<UserInfo> = getConnection().getRepository(UserInfo);

		const userInfo: UserInfo = await userInfoRepository.findOne({
			where: {
				userId,
			},
			relations: ['event']
		});

		return userInfo;
	}

	public static async getAllUsers(currentUser: User, limit = 50, page = 1, search?: string) { // eslint-disable-line
		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);

		const totalCount = await userRepository.countWithSearch(search);

		if (limit < 1) {
			throw new ApplicationError('Limit should be more 1');
		}

		const maxPage = Math.ceil(totalCount / limit) || 1;
		const currentPage = Math.max(Math.min(maxPage, page), 1);

		if (limit > MAX_LIMIT) {
			throw new ApplicationError(`Max limit ${MAX_LIMIT}`);
		}

		const users: User[] = await userRepository.findAll(currentPage, limit, search);

		return {
			meta: {
				totalCount,
				limit,
				page: currentPage,
				maxPage,
				name: '',
			},
			users
		};
	}

	public static async getUserById(userId: number) {
		if (!userId) {
			return null;
		}

		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		const user: User = await userRepository.findById(userId);

		return user;
	}

	public static async deleteAthleteById(currentUser: User, userId: number) {
		if (!userId) {
			return null;
		}

		if (currentUser.userTypeId !== UserType.COACH) {
			throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
		}

		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		const planRepository: PlanRepository = getConnection().getCustomRepository(PlanRepository);
		const inviteRepository: InviteRepository = getConnection().getCustomRepository(InviteRepository);

		const plan = await planRepository.getLastPlanByAthlete(userId);
		if (plan && plan.coachId !== currentUser.userId) {
			throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
		} else {
			// check invite for users without plan

			const invite = await inviteRepository.findByAthleteId(userId);
			if (invite && invite.fromId !== currentUser.userId) {
				throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
			}
		}

		await userRepository.deleteById(userId);
	}

	public static async create({
		firstName,
		lastName,
		email,
		phone,
		userTypeId,
		rawPassword
	}) {
		if (!firstName) {
			throw new ApplicationError('First name is required');
		}

		if (!lastName) {
			throw new ApplicationError('Last name is required');
		}

		if (!email) {
			throw new ApplicationError('Email is required');
		}

		if (!EmailValidator.validate(email)) {
			throw new ApplicationError('Wrong email');
		}

		if (!userTypeId) {
			throw new ApplicationError('User type is required');
		}

		if (!rawPassword) {
			throw new ApplicationError('Password is required');
		}

		if (!passwordSchema.validate(rawPassword)) {
			throw new ApplicationError('Password can not be less than 6 characters');
		}

		const clearPhone = phoneClean(phone);
		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);

		const userWithCurrentEmail: User = await userRepository.findByEmail(email);

		if (userWithCurrentEmail) {
			throw new ApplicationError('User with this email already exists', HttpStatusCodes.CONFLICT);
		}

		const password = await bcrypt.hash(rawPassword, 10);

		const user = userRepository.create({
			firstName,
			lastName,
			email,
			phone: clearPhone,
			password,
			userTypeId,
		});

		const dbUser: User = await userRepository.save(user);

		return dbUser;
	}

	public static async updateUserById(currentUser: User, params: {
		userId: number;
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
		address: string | undefined;
		city: string | undefined;
		state: string | undefined;
		zipCode: string | undefined;
		country: string | undefined;
		isActive: boolean;
		coachPlanId: number;
	}) {
		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);

		if (!params.email || !EmailValidator.validate(params.email)) {
			throw new ApplicationError('Wrong email');
		}

		if (currentUser.userTypeId !== UserType.ADMIN && currentUser.userId !== params.userId) {
			throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
		}

		if (!params.userId) {
			throw new ApplicationError('User not found', HttpStatusCodes.NOT_FOUND);
		}

		if (params.phone) {
			params.phone = phoneClean(params.phone);
		}

		const user = await userRepository.findById(params.userId);
		if (!user) {
			throw new ApplicationError('User not found', HttpStatusCodes.NOT_FOUND);
		}

		const userWithCurrentEmail: User = await userRepository.findByEmail(params.email);

		if (userWithCurrentEmail && userWithCurrentEmail.userId !== params.userId && userWithCurrentEmail.userId !== currentUser.userId) {
			throw new ApplicationError('User with this email already exists', HttpStatusCodes.CONFLICT);
		}

		if (currentUser.userTypeId === UserType.ADMIN && user.userTypeId === UserType.ATHLETE) {
			const coachPlanToUserRepository: CoachPlanToUserRepository = getConnection().getCustomRepository(CoachPlanToUserRepository);

			const [_, coach] = await to(UserService.getMyCoach(user)); // eslint-disable-line
			if (coach) {
				const coachPlanToUser = await coachPlanToUserRepository.getByCoachId(coach.userId);
				const countOfAthletes = await userRepository.getTotalActiveAthletesCount(coach.userId);

				if (coachPlanToUser &&
					coachPlanToUser.coachPlan &&
					coachPlanToUser.coachPlan.maxAthletes && // not null, null == inf
					coachPlanToUser.coachPlan.maxAthletes <= countOfAthletes) {
					throw new ApplicationError('Number of athletes has reached the maximum amount. Please contact the coach.');
				}

				const planRepository: PlanRepository = getConnection().getCustomRepository(PlanRepository);

				const countOfTemplates = (await planRepository.listOfAssignedCustomPlans(currentUser.userId)).length;

				if (coachPlanToUser &&
					coachPlanToUser.coachPlan &&
					coachPlanToUser.coachPlan.maxTemplates && // not null, null == inf
					coachPlanToUser.coachPlan.maxTemplates < countOfTemplates) {
					throw new ApplicationError('Custom plans need to be removed to meet plan requirements. Please contact the coach.');
				}
			}
		}

		await userRepository.updateById(params.userId, params);

		if (user.userTypeId === UserType.COACH && params.coachPlanId) {
			await SubscriptionService.setPlanForCoach(user, params.coachPlanId, null, currentUser.userTypeId === UserType.ADMIN);
		}

		await to(SendBirdService.updateName(user, `${params.firstName} ${params.lastName}`));

		return user;
	}

	public static async getMyCoach(currentUser: User) {
		if (currentUser.userTypeId !== UserType.ATHLETE) {
			throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
		}

		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);

		const athlete = await userRepository.findAthleteById(currentUser.userId);
		let coachId = null;

		if (athlete.athleteInvite && athlete.athleteInvite[0]) {
			coachId = athlete.athleteInvite[0].fromId;
		}

		if (athlete.planOfAthlete && athlete.planOfAthlete[0]) {
			coachId = athlete.planOfAthlete[0].coachId;
		}

		if (!coachId) {
			throw new ApplicationError('Not found', HttpStatusCodes.NOT_FOUND);
		}

		const coach: User = await userRepository.findCoachById(coachId);

		if (!coach) {
			throw new ApplicationError('Not found', HttpStatusCodes.NOT_FOUND);
		}

		if (coach.coachInfo && (!coach.coachInfo.images || coach.coachInfo.images.length === 0)) {
			coach.coachInfo.images = [coach.avatar];
		}

		return coach;
	}

	public static async updateAvatar(currentUser, file) {
		let type = 'users';

		switch (currentUser.userTypeId) {
			case UserType.ATHLETE:
				type = 'athletes';
				break;
			case UserType.COACH:
				type = 'coaches';
				break;
			default:
				type = 'users';
		}

		const [err, s3Data] = await to(s3.upload({
			Bucket: env.AWS_S3_BUCKET,
			Key: `${type}/${currentUser.userId}/avatar/${Date.now()}-${file.name}`,
			Body: fs.createReadStream(file.path),
			ACL: 'public-read',
			ContentType: file.type,
		})
			.promise());

		if (err) {
			throw new ApplicationError(err.message, HttpStatusCodes.FORBIDDEN);
		}

		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);

		const link = s3Data.Location.replace('s3.amazonaws.com/', '');
		await userRepository.updateAvatar(currentUser.userId, link);

		await to(SendBirdService.updateAvatar(currentUser, link));

		return link;
	}

	public static async uploadFile(currentUser, file) {
		const date = new Date();
		const [err, s3Data] = await to(s3.upload({
			Bucket: env.AWS_S3_BUCKET,
			Key: `users/${currentUser.userId}/files/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}/${Date.now()}.${(file.name || '').split('.').pop()}`,
			Body: fs.createReadStream(file.path),
			ACL: 'public-read',
			ContentType: file.type,
		})
			.promise());

		if (err) {
			throw new ApplicationError(err.message, HttpStatusCodes.FORBIDDEN);
		}

		const link = s3Data.Location.replace('s3.amazonaws.com/', '');
		return link;
	}

	public static async getCoachById(coachId: number) {
		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);

		if (!coachId) {
			throw new ApplicationError('Not found', HttpStatusCodes.NOT_FOUND);
		}

		const coach: User = await userRepository.findCoachById(coachId);

		if (!coach) {
			throw new ApplicationError('Not found', HttpStatusCodes.NOT_FOUND);
		}

		if (coach.coachInfo && (!coach.coachInfo.images || coach.coachInfo.images.length === 0)) {
			coach.coachInfo.images = [coach.avatar];
		}

		return coach;
	}

	public static async getCoachInfoById(coachId: number) {
		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);

		if (!coachId) {
			throw new ApplicationError('Not found', HttpStatusCodes.NOT_FOUND);
		}

		const coach: User = await userRepository.findCoachById(coachId);

		if (!coach) {
			throw new ApplicationError('Not found', HttpStatusCodes.NOT_FOUND);
		}

		if (!coach.coachInfo) {
			return null;
		}

		if (!coach.coachInfo.images || coach.coachInfo.images.length === 0) {
			coach.coachInfo.images = [coach.avatar];
		}

		return coach.coachInfo;
	}

	public static async updateCoachInfoById(coachId: number, info: any) {
		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		const coachInfoRepository: CoachInfoRepository = getConnection().getCustomRepository(CoachInfoRepository);

		if (!coachId) {
			throw new ApplicationError('Not found', HttpStatusCodes.NOT_FOUND);
		}

		if (!info) {
			throw new ApplicationError('Bad request');
		}

		if (!info.about) {
			throw new ApplicationError('Please enter a coach bio');
		}

		const MAX_SHORT_BIO = 200;
		if (info.about.split(' ').length > MAX_SHORT_BIO) {
			throw new ApplicationError(`Short bio should be less than ${MAX_SHORT_BIO} words`);
		}

		if (!info.specialties || !info.specialties.length) {
			throw new ApplicationError('Please enter at least one specialty');
		}

		if (info.specialties.length > 10) {
			throw new ApplicationError('Max 10 specialties');
		}

		const MAX_LINE = 100;
		if (info.specialties.some((line) => line.length > MAX_LINE)) {
			throw new ApplicationError(`Each specialty should be less than ${MAX_LINE} charts`);
		}

		const coach: User = await userRepository.findCoachById(coachId);

		if (!coach) {
			throw new ApplicationError('Not found', HttpStatusCodes.NOT_FOUND);
		}

		const coachInfo = await coachInfoRepository.findById(coachId);

		if (coachInfo) {
			if (!coach.avatar && (!coachInfo.images || coachInfo.images.length === 0)) {
				throw new ApplicationError('Please upload your profile photo');
			}

			await coachInfoRepository.updateInfo(coachId, info);
		} else {
			if (!coach.avatar) {
				throw new ApplicationError('Please upload your profile photo');
			}

			await coachInfoRepository.add(coachId, info);
		}
	}

	public static async updateMeasurement(user: User, measurementId: number) {
		const coachInfoRepository: CoachInfoRepository = getConnection().getCustomRepository(CoachInfoRepository);

		const coachInfo = await coachInfoRepository.findById(user.userId);

		if (coachInfo) {
			await coachInfoRepository.updateMeasurement(user.userId, measurementId);
		} else {
			await coachInfoRepository.addMeasurement(user.userId, measurementId);
		}
	}

	public static async uploadCoachImage(coachId, file) {
		const [err, s3Data] = await to(s3.upload({
			Bucket: env.AWS_S3_BUCKET,
			Key: `coaches/${coachId}/avatar/${Date.now()}-${file.name}`,
			Body: fs.createReadStream(file.path),
			ACL: 'public-read',
			ContentType: file.type,
		})
			.promise());

		if (err) {
			throw new ApplicationError(err.message, HttpStatusCodes.FORBIDDEN);
		}

		const link = s3Data.Location.replace('s3.amazonaws.com/', '');

		return link;
	}

	public static async completeOnboarding(userId: number) {
		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);

		return userRepository.completeOnboarding(userId);
	}

	public static async setSmsNotificationStatus(currentUser: User, isSmsEnabled: boolean) {
		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		return userRepository.setSmsNotificationStatus(currentUser.userId, isSmsEnabled);
	}

	public static async getCustomQuestions(coachId: number) {
		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);

		if (!coachId) {
			throw new ApplicationError('Not found', HttpStatusCodes.NOT_FOUND);
		}

		const coach: User = await userRepository.findCoachById(coachId);

		if (!coach) {
			throw new ApplicationError('Not found', HttpStatusCodes.NOT_FOUND);
		}

		if (!coach.coachInfo) {
			return [];
		}

		return coach.coachInfo.customQuestions;
	}

	public static async updateCustomQuestions(coachId: number, questions: string[]) {
		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		const coachInfoRepository: CoachInfoRepository = getConnection().getCustomRepository(CoachInfoRepository);

		if (!coachId) {
			throw new ApplicationError('Not found', HttpStatusCodes.NOT_FOUND);
		}

		const coach: User = await userRepository.findCoachById(coachId);
		if (!coach) {
			throw new ApplicationError('Not found', HttpStatusCodes.NOT_FOUND);
		}

		const coachInfo = await coachInfoRepository.findById(coachId);
		if (!coachInfo) {
			throw new ApplicationError('Bad request');
		}

		await coachInfoRepository.setCustomQuestions(coachId, questions);
	}

	public static async sendUserListReport() {
		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);

		const allData = await userRepository.getUserListReport();

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

		let csvFile;
		if (allData && allData.length > 0) {
			const csvExporter = new ExportToCsv(options);
			csvFile = csvExporter.generateCsv(allData, true);
		} else {
			// do nothing

			return;
		}

		const filename = `UserList-Report-${(new Date).toDateString()}.csv`;
		const urlToReport = await s3.upload({
			Bucket: process.env.AWS_S3_BUCKET,
			Key: `reports/users/${Date.now()}-` + filename,
			Body: csvFile,
			ServerSideEncryption: 'AES256',
			ACL: 'private',
			ContentType: 'text/csv',
			ContentDisposition: 'attachment',
		})
			.promise()
			.then((s3Data) => {
				const params = {
					Bucket: s3Data.Bucket,
					Key: s3Data.Key,
					Expires: 3600 * 24 * 7 // eslint-disable-line
				};

				return s3.getSignedUrl('getObject', params);
			})
			.catch((error) => {
				error.httpStatusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
				throw error;
			});

		const titleForAdminEmail = 'User List Report';
		let contentForAdminEmail = fs.readFileSync('src/emails/email_template_without_button.html', 'utf8');
		contentForAdminEmail = contentForAdminEmail.replace(/{{TITLE}}/g, titleForAdminEmail);
		contentForAdminEmail = contentForAdminEmail.replace(/{{FOOTER_TEXT}}/g, `
		Thanks,
		<br/>
		The Bird Team
		`);
		contentForAdminEmail = contentForAdminEmail.replace('{{TEXT}}', `
		Hello Administrator,
		<br/>
		<br/>
		Click this <a href="${urlToReport}">link</a> to get your current list of users
		`);

		await to(Mail.sendMail(env.FLEET_FEET_SUPPORT_EMAIL, titleForAdminEmail, contentForAdminEmail, 'Bird<hello@bird.coach>'));

		return urlToReport;
	}

	public static async sendAthleteEngagementReport() {
		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);

		const allData = await userRepository.getAthleteEngagementReport();

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

		let csvFile;
		if (allData && allData.length > 0) {
			const csvExporter = new ExportToCsv(options);
			csvFile = csvExporter.generateCsv(allData, true);
		} else {
			// do nothing

			return;
		}

		const filename = `AthleteEngagement-Report-${(new Date).toDateString()}.csv`;
		const urlToReport = await s3.upload({
			Bucket: process.env.AWS_S3_BUCKET,
			Key: `reports/users/${Date.now()}-` + filename,
			Body: csvFile,
			ServerSideEncryption: 'AES256',
			ACL: 'private',
			ContentType: 'text/csv',
			ContentDisposition: 'attachment',
		})
			.promise()
			.then((s3Data) => {
				const params = {
					Bucket: s3Data.Bucket,
					Key: s3Data.Key,
					Expires: 3600 * 24 * 7 // eslint-disable-line
				};

				return s3.getSignedUrl('getObject', params);
			})
			.catch((error) => {
				error.httpStatusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
				throw error;
			});

		const titleForAdminEmail = 'Athlete Engagement Report';
		let contentForAdminEmail = fs.readFileSync('src/emails/email_template_without_button.html', 'utf8');
		contentForAdminEmail = contentForAdminEmail.replace(/{{TITLE}}/g, titleForAdminEmail);
		contentForAdminEmail = contentForAdminEmail.replace(/{{FOOTER_TEXT}}/g, `
		Thanks,
		<br/>
		The Bird Team
		`);
		contentForAdminEmail = contentForAdminEmail.replace('{{TEXT}}', `
		Hello Administrator,
		<br/>
		<br/>
		Click this <a href="${urlToReport}">link</a> to get Athlete Engagement Report!
		`);

		await to(Mail.sendMail(env.FLEET_FEET_SUPPORT_EMAIL, titleForAdminEmail, contentForAdminEmail, 'Bird<hello@bird.coach>'));

		return urlToReport;
	}

	public static async sendMotivationPushOnSunday() {
		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);

		const list = await userRepository.getAthletesWithMissedWorkouts();

		for (const item of list) {
			await to(PushNotificationService.sendToUser(item.userId, {
				title: 'Hey, no sweat.',
				body: `Tomorrow's a new week and a fresh start in ${item.name || 'plan'}. Check out your plan and set your goal for the week! #progressnotperfection 🏃🏾‍♀️🏃🏽‍♂️`,
				workoutId: null,
				typeId: PushNotificationService.NOTIFICATION_TYPES.WEEK_CARD_NEXT,
			}, {
				type_id: PushNotificationService.NOTIFICATION_TYPES.WEEK_CARD_NEXT, // eslint-disable-line
				week_number: item.number_of_week || 1 // eslint-disable-line
			}));
		}
	}

	public static async sendMotivationPushDaily() {
		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		const list = await userRepository.getAthletesNotStartedPlan();

		for (const item of list) {
			await to(PushNotificationService.sendToUser(item.userId, {
				title: 'Need some help?',
				body: 'Hey, we noticed you haven\'t started your program yet. If life got in the way, no worries! Text us at (773) 900-8985 if we can help. 🙂',
				workoutId: null,
				typeId: PushNotificationService.NOTIFICATION_TYPES.WEEK_CARD,
			}, {
				type_id: PushNotificationService.NOTIFICATION_TYPES.WEEK_CARD, // eslint-disable-line
				week_number: 1 // eslint-disable-line
			}));
		}
	}

}
