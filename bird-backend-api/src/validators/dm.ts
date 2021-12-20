import * as Joi from 'joi';

export const dmvValidatorModel: Joi.ObjectSchema = Joi.object().keys({
	message: Joi.string().required(),
	// eslint-disable-next-line @typescript-eslint/camelcase
	user_id_from: Joi.number().min(1).required(),
	// eslint-disable-next-line @typescript-eslint/camelcase
	user_id_to: Joi.number().min(1).required(),
	// eslint-disable-next-line @typescript-eslint/camelcase
	is_sent_by_coach: Joi.boolean().required(),
});
