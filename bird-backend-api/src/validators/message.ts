import * as Joi from 'joi';

export const messageValidatorModel: Joi.ObjectSchema = Joi.object().keys({
	message: Joi.string().required(),
	users: Joi.array().items({
		// eslint-disable-next-line @typescript-eslint/camelcase
		user_id: Joi.number().required(),
		// eslint-disable-next-line @typescript-eslint/camelcase
		plan_id: Joi.number().required(),
	}).min(0).required(),
	// eslint-disable-next-line @typescript-eslint/camelcase
	plan_ids: Joi.array().items(Joi.number()).min(0).required(),
});
