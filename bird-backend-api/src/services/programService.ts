import { getConnection } from 'typeorm';
import to from 'await-to-js';
import Stripe from 'stripe';
import * as HttpStatusCodes from 'http-status-codes';
import Program from '../models/plan/program';
import ApplicationError from '../errors/applicationError';
import UserRepository from '../repository/user/userRepository';
import env from '../env';
import ProgramRepository from '../repository/plan/programRepository';
import StripeService from './stripeService';
import AuthService from './authService';
import ActiveCampaignService from './activeCampaignService';

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
	apiVersion: '2020-08-27',
});

export default class ProgramService {

	public static async getProgramByAlias(alias) : Promise<Program>{
		const programRepository: ProgramRepository = getConnection().getCustomRepository(ProgramRepository);
		const program: Program = await programRepository.findByAlias(alias);

		if (!program) {
			throw new ApplicationError('Not found', HttpStatusCodes.NOT_FOUND);
		}

		return program;
	}

	public static async pay({ email, coupon, token, programAlias }) : Promise<any>{
		if (!email) {
			throw new ApplicationError('Email is required');
		}

		if (!token) {
			throw new ApplicationError('Token is required');
		}

		if (!programAlias) {
			throw new ApplicationError('Program is required');
		}

		const userRepository: UserRepository = getConnection().getCustomRepository(UserRepository);
		const programRepository: ProgramRepository = getConnection().getCustomRepository(ProgramRepository);

		const user = await userRepository.findByEmail(email);
		if (!user) {
			throw new ApplicationError('Wrong email');
		}

		const program: Program = await programRepository.findByAlias(programAlias);
		if (!program) {
			throw new ApplicationError('Event not found');
		}

		const ffCoach = await userRepository.findById(program.planTemplate.coachId);
		if (!ffCoach) {
			throw new ApplicationError('Fleet Feet Coach not found');
		}

		const { stripeSourceId } = await StripeService.createCustomer(user, token);
		const { paymentIntent } = await StripeService.invoicePayment(user, program, coupon, stripeSourceId);

		await AuthService.sendInvite(ffCoach.userId, {
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			phone: user.phone,
			address: user.address,
			city: user.city,
			state: user.state,
			zipCode: user.zipCode,
		}, true, program.planTemplateId, program.startDate, program.alias);

		const eventName = 'Purchased';
		const eventData = `Program: ${programAlias}`;
		await ActiveCampaignService.triggerEvent(eventName, eventData, email);

		return { paymentIntent };
	}

	public static async checkCoupon(programAlias, couponCode) : Promise<any>{
		const programRepository: ProgramRepository = getConnection().getCustomRepository(ProgramRepository);
		const program: Program = await programRepository.findByAlias(programAlias);

		if (!program) {
			throw new ApplicationError('Not found', HttpStatusCodes.NOT_FOUND);
		}

		const [err, coupon] = await to(stripe.coupons.retrieve(couponCode));

		if (err || !coupon) {
			throw new ApplicationError('Not found', HttpStatusCodes.NOT_FOUND);
		}

		const price = Number(program.price);
		let bonus = 0;

		if (coupon.percent_off) {
			bonus = price * coupon.percent_off / 100;
		}

		if (coupon.amount_off) {
			bonus = coupon.amount_off / 100;
		}

		return {
			coupon: couponCode,
			bonus: bonus.toFixed(2),
		};

		return coupon;
	}

}
