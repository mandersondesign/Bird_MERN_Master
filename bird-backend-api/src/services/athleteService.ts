import { getConnection } from 'typeorm';
import * as HttpStatusCodes from 'http-status-codes';
import to from 'await-to-js';
import * as fs from 'fs';
import Mail from '../utils/mail';
import User from '../models/user/user';
import UserRepository from '../repository/user/userRepository';
import UserType from '../models/user/user_type';
import ApplicationError from '../errors/applicationError';
import PlanTemplateRepository from '../repository/plan/planTemplateRepository';
import env from '../env';
import MessageRepository from '../repository/plan/messageRepository';
import Message from '../models/plan/message';
import NoteRepository from '../repository/user/noteRepository';
import Note from '../models/user/note';
import UserService from './userService';

const client = require('twilio')(env.TWILIO_SID, env.TWILIO_TOKEN); // eslint-disable-line

export default class AthleteService {

	public static async getById(currentUser: User, athleteId: number): Promise<User> {
		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		const athlete: User = await userRepository.findAthleteById(athleteId);

		if (!athlete) {
			throw new ApplicationError('Not found', HttpStatusCodes.NOT_FOUND);
		}

		if (!(currentUser.userTypeId === UserType.ADMIN ||
			currentUser.userTypeId === UserType.ATHLETE &&
			currentUser.userId === athleteId ||
			currentUser.userTypeId === UserType.COACH &&
			athlete.athleteInvite && athlete.athleteInvite[0] && currentUser.userId === athlete.athleteInvite[0].fromId ||
			currentUser.userTypeId === UserType.COACH &&
			athlete.planOfAthlete && athlete.planOfAthlete[0] && currentUser.userId === athlete.planOfAthlete[0].coachId
		)) {
			throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
		}

		return athlete;
	}

	public static async list(
		coachId: number,
		limit: number,
		page: number,
		sortField: string,
		sortType: 'ASC' | 'DESC' = 'DESC'
	) {
		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		const athletes: User[] = await userRepository.listOfAllAthletes(coachId, limit, page, sortField, sortType);
		const totalCount: number = await userRepository.getTotalAthletesCount(coachId);

		const maxPage = Math.ceil(totalCount / limit) || 1;
		const currentPage = Math.max(Math.min(maxPage, page), 1);

		return {
			athletes,
			meta: {
				totalCount,
				limit,
				page: currentPage,
				maxPage,
				name: '',
			},
		};
	}

	public static async listAll(coachId) {
		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		const athletes: User[] = await userRepository.listAllAthletes(coachId);
		const totalCount: number = await userRepository.getTotalAthletesCount(coachId);
		return {
			athletes,
			meta: {
				totalCount,
				limit: 0,
				page: 0,
				maxPage: 0,
				name: '',
			},
		};
	}

	public static async unassignedList(
		coachId: number,
		limit: number,
		page: number,
		sortField: string,
		sortType: 'ASC' | 'DESC' = 'DESC'
	) {
		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		const athletes: User[] = await userRepository.listOfUnassignedAthletes(coachId, limit, page, sortField, sortType);
		const totalCount = await userRepository.getTotalUnassignedAthletesCount(coachId);

		const maxPage = Math.ceil(totalCount / limit) || 1;
		const currentPage = Math.max(Math.min(maxPage, page), 1);

		return {
			athletes,
			meta: {
				totalCount,
				limit,
				page: currentPage,
				maxPage,
				name: '',
			},
		};
	}

	public static async getAthletesByPlanTemplateId(
		coachId: number,
		planTemplateId: number,
		limit: number,
		page: number,
		sortField: string,
		sortType: 'ASC' | 'DESC' = 'DESC'
	) {
		const planTemplateRepository: PlanTemplateRepository = getConnection().getCustomRepository(PlanTemplateRepository);
		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		const athletes: User[] = await userRepository.listOfAthletesByPlan(coachId, limit, page, sortField, sortType, planTemplateId);
		const totalCount: number = await userRepository.getTotalAthletesCountByPlanTemplateId(coachId, planTemplateId);
		const planTemplateModel = await planTemplateRepository.findById(planTemplateId);
		const planTemplateName = planTemplateModel ? planTemplateModel.name : '';

		const maxPage = Math.ceil(totalCount / limit) || 1;
		const currentPage = Math.max(Math.min(maxPage, page), 1);

		return {
			athletes,
			meta: {
				totalCount,
				limit,
				page: currentPage,
				maxPage,
				name: planTemplateName,
			},
		};
	}

	public static async getTotalAthletesCount(coachId: number): Promise<number> {
		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		const count: number = await userRepository.getTotalAthletesCount(coachId);

		return count;
	}

	public static async getTotalActiveAthletesCount(coachId: number): Promise<number> {
		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		const count: number = await userRepository.getTotalActiveAthletesCount(coachId);

		return count;
	}

	public static async getTotalUnassignedAthletesCount(coachId: number): Promise<number> {
		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		const count: number = await userRepository.getTotalUnassignedAthletesCount(coachId);

		return count;
	}

	public static async search(query: string, coachId: number): Promise<User[]> {
		if (!query) {
			return [];
		}

		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		const page = 1;
		const limit = 5;
		const users: User[] = await userRepository.searchAthletes(page, limit, coachId, query);

		return users;
	}

	public static async requestCallback(athleteId: number): Promise<any> {
		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		const athlete: User = await userRepository.findAthleteById(athleteId);

		if (!athlete) {
			throw new ApplicationError('Not found', HttpStatusCodes.NOT_FOUND);
		}

		let email;
		const coach = await UserService.getMyCoach(athlete);

		let content = fs.readFileSync('src/emails/email_template_without_button.html', 'utf8');
		content = content.replace(/{{TITLE}}/g, 'Bird Call Request');


		if (athlete.isPaid && coach) {
			email = coach.email;
			content = content.replace('{{TEXT}}', `
				Hello ${coach.firstName},
				<br/>
				<br/>
				We've received an athlete phone call request.
				<br/>
				<br/>
				athlete ${athlete.firstName} ${athlete.lastName}<br/>
				email ${athlete.email}<br/>
				phone number ${athlete.phone}
				<br/>
				<br/>
				Please contact the athelete ASAP.
		`);
		} else {
			email = 'Bird<help@bird.coach>';
			content = content.replace('{{TEXT}}', `
				Hello Administrator,
				<br/>
				<br/>
				We've received an athlete phone call request.
				<br/>
				<br/>
				athlete ${athlete.firstName} ${athlete.lastName}<br/>
				email ${athlete.email}<br/>
				phone number ${athlete.phone}
				<br/>
				<br/>
				Please contact the coach ${coach.firstName} ${coach.lastName} with the email ${coach.email} ASAP.
			`);
		}

		content = content.replace(/{{FOOTER_TEXT}}/g, `
			Thanks!
			<br/>
			The Bird Team
		`);

		const [err] = await to(Mail.sendMail(email, 'Bird Call Request', content, 'Bird<help@bird.coach>'));

		if (err) {
			throw err;
		}
	}

	public static async getMessages(currentUser: User, athleteId: number): Promise<Message[]> {
		const messageRepository: MessageRepository = getConnection().getCustomRepository(MessageRepository);
		const messages: Message[] = await messageRepository.find({
			where: {
				athleteId, // TODO: only for current week
			},
			order: {
				date: 'DESC'
			}
		});

		return messages;
	}

	public static async getNote(currentUser: User, athleteId: number): Promise<string> {
		const noteRepository: NoteRepository = getConnection().getCustomRepository(NoteRepository);
		const note: Note = await noteRepository.getNote(athleteId, currentUser.userId);

		if (!note) {
			return '';
		}

		return note.text;
	}

	public static async setNote(currentUser: User, athleteId: number, text: string): Promise<any> {
		const noteRepository: NoteRepository = getConnection().getCustomRepository(NoteRepository);
		const note: Note = await noteRepository.getNote(athleteId, currentUser.userId);

		if (!note) {
			return noteRepository.addNote(athleteId, currentUser.userId, text);
		}

		return noteRepository.updateNote(athleteId, currentUser.userId, text);
	}

	public static async sendNotificationAboutPublishPlan(coach: User, athleteId: number): Promise<any> {
		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);

		const athlete: User = await userRepository.findAthleteById(athleteId);

		if (!athlete) {
			throw new ApplicationError('Not found', HttpStatusCodes.NOT_FOUND);
		}

		if (coach.isSmsEnabled && athlete.isSmsEnabled) {
			client.messages
				.create({
					body: `To get started, please download the Bird iOS (apple.co/3zmcTdQ) or Android app (bit.ly/3xce25B). If you have any questions, email us at hello@bird.coach. Happy trails!🏃🏾‍♀️🏃🏻‍♂️`, // eslint-disable-line
					from: env.TWILIO_PHONE,
					to: athlete.phone,
				})
				.catch((e) => console.log(e));
		}
	}

	public static async getAthletesByIds(userIds: number[], coachId: number) {
		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		const users = userIds.toString();
		return await userRepository.getActiveAthletesByIds(users, coachId);
	}

	public static async getAthletesByPlanIds(templateIds: number[], coachId: number) {
		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		const templates = templateIds.toString();
		return await userRepository.getAthletesByPlanIds(templates, coachId);
	}

	public static async getAthleteByPhone(phone: string, phoneFormatted: string) {
		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		return await userRepository.getAthleteByphone(phone, phoneFormatted);
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
