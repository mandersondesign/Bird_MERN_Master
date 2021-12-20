import { getConnection, Repository } from 'typeorm';
import Stripe from 'stripe';
import env from '../env';
import User from '../models/user/user';
import Program from '../models/plan/program';
import CoachPlan from '../models/subscription/coach_plan';;
import AthletePlan from '../models/subscription/athlete_plan';;
import StripeCardRepository from '../repository/subscription/stripeCardRepository';
import ApplicationError from '../errors/applicationError';
import UserToStripe from '../models/subscription/user_to_stripe';
import CoachToStripeSubscription from '../models/subscription/coach_to_stripe_subscription';
import UserRepository from '../repository/user/userRepository';
import to from 'await-to-js';
import Mail from '../utils/mail';
import CoachPlanToUserRepository from '../repository/subscription/coachPlanToUserRepository';
import AthletePlanToUserRepository from '../repository/subscription/athletePlanToUserRepository';
import UserType from '../models/user/user_type';
import PayLogRepository from '../repository/fleetfeet/payLogRepository';
import OrderRepository from '../repository/subscription/orderRepository';
import AthleteToStripeSubscription from '../models/subscription/athlete_to_stripe_subscription';

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
	apiVersion: '2020-08-27',
});

export default class StripeService {

	public static async webhook(event) : Promise<any>{
		// TODO: check signature
		// const sig = req.headers['stripe-signature'];
		// const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_KEY);

		const coachToStripeSubscriptionRepository : Repository<CoachToStripeSubscription> = getConnection().getRepository(CoachToStripeSubscription);
		const coachPlanToUserRepository: CoachPlanToUserRepository = getConnection().getCustomRepository(CoachPlanToUserRepository);
		const athleteToStripeSubscriptionRepository : Repository<AthleteToStripeSubscription> = getConnection().getRepository(AthleteToStripeSubscription);
		const athletePlanToUserRepository: AthletePlanToUserRepository = getConnection().getCustomRepository(AthletePlanToUserRepository);


		let object : any;
		let coachSubscription : CoachToStripeSubscription = null;
		let athleteSubscription : AthleteToStripeSubscription = null;

		switch (event.type) {
			case 'customer.subscription.deleted':
			case 'invoice.payment_succeeded':
			case 'invoice.payment_failed':
				object = event.data.object;

				coachSubscription = await coachToStripeSubscriptionRepository.findOne({
					stripeSubscriptionId: object.subscription
				}, {
					relations: ['coachPlanToUser', 'user']
				});

				if (!coachSubscription) {
					athleteSubscription = await athleteToStripeSubscriptionRepository.findOne({
						stripeSubscriptionId: object.subscription
					}, {
						relations: ['athletePlanToUser', 'user']
					});
				}
				break;
		}

		if ((!coachSubscription && !athleteSubscription) || !object) {
			return; // do nothing
		}

		if (event.type === 'customer.subscription.deleted') {
			if (coachSubscription) {
				coachToStripeSubscriptionRepository.merge(coachSubscription, {
					isActive: false,
				});
				await coachToStripeSubscriptionRepository.save(coachSubscription);

				await coachPlanToUserRepository.setErrorMessage(coachSubscription.coachPlanToUserId, 'Subscription canceled');
				// TODO: BIRD-926 Update content or remove
				await to(Mail.sendMail(coachSubscription.user.email, 'Subscription canceled', 'Oops.', 'Bird<help@bird.coach>'));
			} else if (athleteSubscription) {
				athleteToStripeSubscriptionRepository.merge(athleteSubscription, {
					isActive: false,
				});
				await athleteToStripeSubscriptionRepository.save(athleteSubscription);

				await athletePlanToUserRepository.setErrorMessage(athleteSubscription.athletePlanToUserId, 'Subscription canceled');
				// TODO: BIRD-926 Update content or remove
				await to(Mail.sendMail(athleteSubscription.user.email, 'Subscription canceled', 'Oops.', 'Bird<help@bird.coach>'));

			}
		} else if (event.type === 'invoice.payment_succeeded') {
			if (coachSubscription) {
				await coachPlanToUserRepository.updatePaidToDate(coachSubscription.coachPlanToUserId, new Date(object.period_end * 1000));
			} else if (athleteSubscription) {
				await athletePlanToUserRepository.updatePaidToDate(athleteSubscription.athletePlanToUserId, new Date(object.period_end * 1000));
			}
		} else if (event.type === 'invoice.payment_failed') {
			if (coachSubscription) {
				await coachPlanToUserRepository.setErrorMessage(coachSubscription.coachPlanToUserId, 'Please update your payment method');
			} else if (athleteSubscription) {
				await athletePlanToUserRepository.setErrorMessage(athleteSubscription.athletePlanToUserId, 'Please update your payment method');
			}
		}
	}

	public static async createCustomer(user: User, token?: string) : Promise<any>{
		const userRepository : Repository<User> = getConnection().getRepository(User);

		const currentUser : User = await userRepository.findOne({
			userId: user.userId
		}, {
			relations: [
				'stripe',
			]
		});

		let customer: Stripe.Customer | Stripe.DeletedCustomer = null;
		if (currentUser.stripe) {
			customer = await stripe.customers.retrieve(currentUser.stripe.stripeCustomerId);
		} else {
			const params: Stripe.CustomerCreateParams = {
				email: user.email,
				name: `${user.firstName} ${user.lastName}`,
			};

			customer = await stripe.customers.create(params);

			const userToStripeRepository : Repository<UserToStripe> = await getConnection().getRepository(UserToStripe);
			const newUserToStripe = userToStripeRepository.create({
				user,
				stripeCustomerId: customer.id
			});
			await userToStripeRepository.save(newUserToStripe);
		}

		const customerData = { customerId: customer.id, stripeSourceId: undefined };

		if (token) {
			const source : Stripe.Card = await stripe.customers.createSource(
				customer.id,
				{
					source: token
				}
			) as Stripe.Card;

			customerData.stripeSourceId = source.id;

			const stripeCardRepository: StripeCardRepository = getConnection().getCustomRepository(StripeCardRepository);
			await stripeCardRepository.add({
				userId: user.userId,
				stripeCustomerId: source.customer,
				stripeSourceId: source.id,
				brand: source.brand,
				expMonth: source.exp_month,
				expYear: source.exp_year,
				fingerprint: source.fingerprint,
				funding: source.funding,
				last4: source.last4,
			});
		}

		return customerData;
	}

	public static async createSubscription(user: User, coachPlanId: number, isAdmin = false) {
		if (!coachPlanId) {
			throw new ApplicationError('missing required parameter plan_id');
		}

		return getConnection().transaction(async (entityManager) => {
			const userRepository: UserRepository = entityManager.getCustomRepository(UserRepository);
			const currentUser : User = await userRepository.findOne({
				userId: user.userId
			}, {
				relations: [
					'stripe',
					'coachPlanToUser',
				]
			});

			const coachPlanRepository : Repository<CoachPlan> = entityManager.getRepository(CoachPlan);
			const coachPlan : CoachPlan = await coachPlanRepository.findOne({
				coachPlanId,
			});

			if (!coachPlan) {
				throw new ApplicationError('Wrong coach_plan_id');
			}

			let coachPlanToUserId;
			const coachPlanToUserRepository: CoachPlanToUserRepository = entityManager.getCustomRepository(CoachPlanToUserRepository);
			if (currentUser.coachPlanToUser) {
				coachPlanToUserId = currentUser.coachPlanToUser.coachPlanToUserId;
			} else {
				coachPlanToUserId = await coachPlanToUserRepository.set(currentUser.userId, coachPlanId);
			}

			const coachToStripeSubscriptionRepository : Repository<CoachToStripeSubscription> = entityManager.getRepository(CoachToStripeSubscription);
			let dbSubscription = await coachToStripeSubscriptionRepository.findOne({
				where: {
					user,
				},
				order: {
					coachPlanToUserId: 'DESC'
				}
			});

			let stripeSubscriptionId = null;
			let paidToDate : Date = null;

			if (coachPlan.stripePlanId) {
				let stripeCustomerId = null;
				if (isAdmin && !currentUser.stripe) {
					await coachPlanToUserRepository.setErrorMessage(coachPlanToUserId, 'Please update your payment method');
				} else if (!currentUser.stripe) {
					// try create new customer by card token
					const customerData = await StripeService.createCustomer(user);
					stripeCustomerId = customerData.customerId;
				} else {
					stripeCustomerId = currentUser.stripe.stripeCustomerId;
				}

				if (stripeCustomerId) {
					const [err, subscription] = await to(stripe.subscriptions.create({
						customer: stripeCustomerId,
						trial_period_days: coachPlan.trialDays || 0, // eslint-disable-line
						items: [
							{
								plan: coachPlan.stripePlanId
							},
						]
					}));

					if (err) {
						throw new ApplicationError(err.message);
					}

					if (dbSubscription && dbSubscription.stripeSubscriptionId) {
						await to(stripe.subscriptions.del(dbSubscription.stripeSubscriptionId));
					}

					stripeSubscriptionId = subscription.id;
					paidToDate = new Date(subscription.current_period_end * 1000);
				}
			}

			if (stripeSubscriptionId) {
				if (dbSubscription) {
					coachToStripeSubscriptionRepository.merge(dbSubscription, {
						stripeSubscriptionId,
						subscriptionEnd: paidToDate,
						coachPlanToUserId,
						isActive: true,
					});
				} else {
					dbSubscription = coachToStripeSubscriptionRepository.create({
						user: currentUser,
						stripeSubscriptionId,
						subscriptionEnd: paidToDate,
						coachPlanToUserId,
						isActive: true,
					});
				}

				await coachToStripeSubscriptionRepository.save(dbSubscription);
			}

			if (!currentUser.isOnboardingCompleted) {
				await userRepository.completeOnboarding(currentUser.userId);
			}

			return paidToDate;
		});
	}

	public static async createAthleteSubscription(user: User, athletePlanId: number) {
		if (!athletePlanId) {
			throw new ApplicationError('missing required parameter plan_id');
		}

		return getConnection().transaction(async (entityManager) => {
			const userRepository: UserRepository = entityManager.getCustomRepository(UserRepository);
			const currentUser : User = await userRepository.findOne({
				userId: user.userId
			}, {
				relations: [
					'stripe',
					'athletePlanToUser',
				]
			});

			const athletePlanRepository : Repository<AthletePlan> = entityManager.getRepository(AthletePlan);
			const athletePlan : AthletePlan = await athletePlanRepository.findOne({
				athletePlanId,
			});

			if (!athletePlan) {
				throw new ApplicationError('Wrong athlete_plan_id');
			}

			let athletePlanToUserId;
			const athletePlanToUserRepository: AthletePlanToUserRepository = entityManager.getCustomRepository(AthletePlanToUserRepository);
			if (currentUser.athletePlanToUser) {
				athletePlanToUserId = currentUser.athletePlanToUser.athletePlanToUserId;
			} else {
				athletePlanToUserId = await athletePlanToUserRepository.set(currentUser.userId, athletePlanId);
			}

			const athleteToStripeSubscriptionRepository : Repository<AthleteToStripeSubscription> = entityManager.getRepository(AthleteToStripeSubscription);
			let dbSubscription = await athleteToStripeSubscriptionRepository.findOne({
				where: {
					user,
				},
				order: {
					athletePlanToUserId: 'DESC'
				}
			});

			let stripeSubscriptionId = null;
			let paidToDate : Date = null;

			if (athletePlan.stripePlanId) {
				let stripeCustomerId = null;
				if (!currentUser.stripe) {
					// try create new customer by card token
					const customerData = await StripeService.createCustomer(user);
					stripeCustomerId = customerData.stripeCustomerId;
				} else {
					stripeCustomerId = currentUser.stripe.stripeCustomerId;
				}

				if (stripeCustomerId) {
					const [err, subscription] = await to(stripe.subscriptions.create({
						customer: stripeCustomerId,
						items: [
							{
								plan: athletePlan.stripePlanId
							},
						]
					}));

					if (err) {
						throw new ApplicationError(err.message);
					}

					if (dbSubscription && dbSubscription.stripeSubscriptionId) {
						await to(stripe.subscriptions.del(dbSubscription.stripeSubscriptionId));
					}

					stripeSubscriptionId = subscription.id;
					paidToDate = new Date(subscription.current_period_end * 1000);
				}
			}

			if (stripeSubscriptionId) {
				if (dbSubscription) {
					athleteToStripeSubscriptionRepository.merge(dbSubscription, {
						stripeSubscriptionId,
						subscriptionEnd: paidToDate,
						athletePlanToUserId,
						isActive: true,
					});
				} else {
					dbSubscription = athleteToStripeSubscriptionRepository.create({
						user: currentUser,
						stripeSubscriptionId,
						subscriptionEnd: paidToDate,
						athletePlanToUserId,
						isActive: true,
					});
				}

				await athleteToStripeSubscriptionRepository.save(dbSubscription);
			}

			if (!currentUser.isOnboardingCompleted) {
				await userRepository.completeOnboarding(currentUser.userId);
			}

			return paidToDate;
		});
	}

	public static async removeCoachSubscription(user: User) {
		const coachToStripeSubscriptionRepository : Repository<CoachToStripeSubscription> = await getConnection().getRepository(CoachToStripeSubscription);
		const dbSubscription = await coachToStripeSubscriptionRepository.findOne({
			where: {
				user,
			},
			order: {
				coachPlanToUserId: 'DESC'
			}
		});

		if (dbSubscription && dbSubscription.stripeSubscriptionId) {
			await to(stripe.subscriptions.del(dbSubscription.stripeSubscriptionId));
		}

		if (dbSubscription) {
			coachToStripeSubscriptionRepository.merge(dbSubscription, {
				isActive: false
			});
			await coachToStripeSubscriptionRepository.save(dbSubscription);
		}
	}

	public static async removeAthleteSubscription(user: User) {
		const athleteToStripeSubscription : Repository<AthleteToStripeSubscription> = getConnection().getRepository(AthleteToStripeSubscription);
		const dbSubscription = await athleteToStripeSubscription.findOne({
			where: {
				user,
			},
			order: {
				athletePlanToUserId: 'DESC'
			}
		});

		if (dbSubscription && dbSubscription.stripeSubscriptionId) {
			await to(stripe.subscriptions.del(dbSubscription.stripeSubscriptionId));
		}

		if (dbSubscription) {
			athleteToStripeSubscription.merge(dbSubscription, {
				isActive: false
			});
			await athleteToStripeSubscription.save(dbSubscription);
		}
	}

	// Used for Fleet Feet event registrations
	public static async oneTimePayment(user: User, amount: number, fletfeetEventId: number, fleetFeetEventName?: string,  stripeSourceId?: string) {
		return getConnection().transaction(async (entityManager) => {
			const userRepository: UserRepository = entityManager.getCustomRepository(UserRepository);
			const payLogRepository: PayLogRepository = entityManager.getCustomRepository(PayLogRepository);

			const currentUser : User = await userRepository.findOne({
				userId: user.userId
			}, {
				relations: [
					'stripe',
				]
			});

			if (!currentUser.stripe) {
				throw new ApplicationError('No credit card information');
			}

			const stripeCustomerId = currentUser.stripe.stripeCustomerId;
			const chargeDescription = `${fleetFeetEventName} charge for ${currentUser.firstName} ${currentUser.lastName}`;

			const [err, payment] = await to(stripe.charges.create({
				amount: Math.ceil((Number(amount) + 0.3) / (1 - 0.029) * 100), // eslint-disable-line
				currency: 'usd',
				customer: stripeCustomerId,
				description: chargeDescription,
				source: stripeSourceId
			}));

			if (err) {
				throw new ApplicationError(err.message);
			}

			if (fletfeetEventId) {
				await payLogRepository.add({
					userId: user.userId,
					fletfeetEventId,
					amount: payment.amount,
					date: new Date(payment.created * 1000), // eslint-disable-line
				});
			}
		});
	}

	public static async invoicePayment(user: User, program: Program, coupon?: string, stripeSourceId?: string) {
		return getConnection().transaction(async (entityManager) => {
			const userRepository: UserRepository = entityManager.getCustomRepository(UserRepository);
			const orderRepository: OrderRepository = entityManager.getCustomRepository(OrderRepository);

			const currentUser : User = await userRepository.findOne({
				userId: user.userId
			}, {
				relations: [
					'stripe',
				]
			});

			if (!currentUser.stripe) {
				throw new ApplicationError('No credit card information');
			}

			const stripeCustomerId = currentUser.stripe.stripeCustomerId;

			try {
				await stripe.invoiceItems.create({
					customer: stripeCustomerId,
					currency: 'usd',
					amount: Math.ceil((Number(program.price)) * 100), // eslint-disable-line
					discounts: coupon ? [{
						coupon,
					}] : null,
					description: `${program.name} Registration`,
				});

				const invoiceDescription = `${program.name} invoice for ${currentUser.firstName} ${currentUser.lastName}`;

				const invoice = await stripe.invoices.create({
					customer: stripeCustomerId,
					description: invoiceDescription,
					// auto-finalize this draft after ~1 hour
					auto_advance: true, // eslint-disable-line
				});

				const invoiceFinal = await stripe.invoices.pay(invoice.id, { source: stripeSourceId });

				if (invoiceFinal.payment_intent) {
					await stripe.paymentIntents.update(invoiceFinal.payment_intent as any, { description: invoiceDescription });
				}

				console.log(invoiceFinal);

				await orderRepository.add({
					userId: user.userId,
					programId: program.programId,
					amount: invoice.amount_paid,
					date: new Date(invoice.created * 1000), // eslint-disable-line,
					appleTransactionId: null,
					appleTransactionPayload: null
				});

				return { paymentIntent: invoiceFinal.payment_intent };
			} catch (err) {
				throw new ApplicationError(err.message);
			}
		});
	}

	public static async listOfCards(user: User, limit = 1) {
		const coachPlanToUserRepository: CoachPlanToUserRepository = getConnection().getCustomRepository(CoachPlanToUserRepository);
		const stripeCardRepository: StripeCardRepository = getConnection().getCustomRepository(StripeCardRepository);

		if (user.userTypeId === UserType.COACH) {
			const coachPlanToUser = await coachPlanToUserRepository.getByCoachId(user.userId);

			if (coachPlanToUser && coachPlanToUser.coachPlanId === CoachPlan.FREE) {
				return null;
			}
		}

		return stripeCardRepository.list(user.userId, limit);
	}

	public static async updateCard(user: User, token: string) : Promise<any>{
		return getConnection().transaction(async (entityManager) => {
			const userToStripeRepository : Repository<UserToStripe> = entityManager.getRepository(UserToStripe);
			const stripeCardRepository: StripeCardRepository = entityManager.getCustomRepository(StripeCardRepository);

			const userToStripe : UserToStripe = await userToStripeRepository.findOne({
				userId: user.userId
			});

			if (!userToStripe) {
				// it's first time
				return StripeService.createCustomer(user, token);
			}

			if (!token) {
				throw new ApplicationError('Token is required');
			}

			const source : Stripe.Card = await stripe.customers.createSource(
				userToStripe.stripeCustomerId,
				{
					source: token
				}
			) as Stripe.Card;

			const oldCards = await stripeCardRepository.find({
				userId: user.userId,
			});

			for (const card of oldCards) {
				await to(stripe.customers.deleteSource(userToStripe.stripeCustomerId, card.stripeSourceId));

				// remove from internal db
				await stripeCardRepository.delete(card);
			}

			await stripeCardRepository.add({
				userId: user.userId,
				stripeCustomerId: source.customer,
				stripeSourceId: source.id,
				brand: source.brand,
				expMonth: source.exp_month,
				expYear: source.exp_year,
				fingerprint: source.fingerprint,
				funding: source.funding,
				last4: source.last4,
			});

			const coachPlanToUserRepository: CoachPlanToUserRepository = getConnection().getCustomRepository(CoachPlanToUserRepository);
			const coachPlanToUser = await coachPlanToUserRepository.getByCoachId(user.userId);
			await coachPlanToUserRepository.removeErrorMessage(coachPlanToUser.coachPlanToUserId);
		});
	}
}
