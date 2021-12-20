import { NextFunction, Response } from 'express';
import * as HttpStatusCodes from 'http-status-codes';
import { getConnection } from 'typeorm';
import ApplicationError from '../errors/applicationError';
import IRequest from '../interfaces/IRequest';
import PlanTemplateRepository from '../repository/plan/planTemplateRepository';

async function updatePlanTemplateMiddleware(req: IRequest, response: Response, next: NextFunction) {

	const currentUser = req.user;
	const planTemplateId = Number(req.params.plan_template_id);

	const planTemplateRepository: PlanTemplateRepository = getConnection().getCustomRepository(PlanTemplateRepository);
	const planTemplate = await planTemplateRepository.findById(planTemplateId);

	if (!planTemplate) {
		throw new ApplicationError('Plan template not found', HttpStatusCodes.NOT_FOUND);
	}

	if (planTemplate.coachId !== currentUser.userId) {
		throw new ApplicationError('Forbidden', HttpStatusCodes.FORBIDDEN);
	}

	await planTemplateRepository.updateDate(planTemplateId);

	next();
}

export default updatePlanTemplateMiddleware;
