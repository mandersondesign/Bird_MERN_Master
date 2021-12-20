import fetch from 'node-fetch';
import { getConnection } from 'typeorm';
import env from '../env';
import OrderRepository from '../repository/squarespace/orderRepository';
import PlanTemplateRepository from '../repository/plan/planTemplateRepository';
import AuthService from './authService';
import { to } from 'await-to-js';
import AppConfig from '../models/app/config';

export default class SquarespaceService {

	public static async syndOrders() {
		const uri = 'https://api.squarespace.com/1.0/commerce/orders'; // + cursor (result?.pagination?.nextPageCursor)
		const response = await fetch(uri, { method: 'get', headers: { 'Authorization': `Bearer ${env.SQUARESPACE_API_KEY}` }, });

		const result = await response.json();

		if (result.errors) {
			return;
		}

		const appConfigRepository = getConnection().getRepository(AppConfig);
		const config = await appConfigRepository.findOne();

		for (const raw of result?.result) {
			await to(getConnection().transaction(async (entityManager) => {
				const orderRepository: OrderRepository = entityManager.getCustomRepository(OrderRepository);
				const planTemplateRepository: PlanTemplateRepository = entityManager.getCustomRepository(PlanTemplateRepository);

				let order = await orderRepository.findByOrderNumber(raw.orderNumber);
				if (order) {
					console.log('order already exist', raw.orderNumber);
					return;
				}

				const planTemplateId = raw.lineItems[0].sku;
				const [err, planTemplate] = await to(planTemplateRepository.findOne(planTemplateId));

				if (err || !planTemplate || planTemplate.planTemplateId <= 6) { // eslint-disable-line
					console.log('wrong plan template id', planTemplateId);
					return;
				}

				order = await orderRepository.add({
					email: raw.customerEmail.toLowerCase().trim(),
					orderNumber: raw.orderNumber,
					createdOn: raw.createdOn,
					firstName: raw.billingAddress?.firstName,
					lastName: raw.billingAddress?.lastName,
					productName: raw.lineItems[0].productName,
					planTemplateId: planTemplate.planTemplateId,
				});

				console.log('created new order', raw.orderNumber);

				await AuthService.sendInvite(planTemplate.coachId || config.defaultCoachId, {
					firstName: order.firstName,
					lastName: order.lastName,
					email: order.email,
					phone: raw.billingAddress?.phone,
				}, false, order.planTemplateId);
			}));
		}
	}
}
