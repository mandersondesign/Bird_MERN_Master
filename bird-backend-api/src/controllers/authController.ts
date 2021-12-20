
import ApplicationError from '../errors/applicationError';
import { NextFunction, Request, Response } from 'express';
import * as HttpStatusCodes from 'http-status-codes';
import * as requestIp from 'request-ip';
import IRequest from '../interfaces/IRequest';
import AuthService from '../services/authService';
import UserTransformer from '../transformers/user';

export default class AuthController {

	public async login(req: Request, res: Response, next: NextFunction) {
		try {
			const email = req.body.email;
			const password = req.body.password;
			const platform = req.body.platform;
			const survey = req.body.survey;

			const token = await AuthService.login({ email, password, platform, survey }, requestIp.getClientIp(req));

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				token
			});
		} catch (error) {
			return next(error);
		}
	}

	public async loginv2(req: Request, res: Response, next: NextFunction) {
		try {
			const email = req.body.email;
			const password = req.body.password;

			const data = await AuthService.loginv2({ email, password }, requestIp.getClientIp(req));

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				token: data.token,
				user_id: data.user.userId, // eslint-disable-line
				user: UserTransformer.transform(data.user),
			});
		} catch (error) {
			return next(error);
		}
	}

	public async logout(req: IRequest, res: Response, next: NextFunction) {
		try {
			if (!req.session) {
				throw new ApplicationError('Session token is required');
			}

			if (req.session && req.session.sessionId) {
				await AuthService.logout(req.session.sessionId);
			}

			res.status(HttpStatusCodes.OK).json({
				message: 'OK'
			});
		} catch (error) {
			return next(error);
		}
	}

	public async addProspect(req: Request, res: Response, next: NextFunction) {
		const { first_name: firstName, last_name: lastName, email, phone, program } = req.body;
		try {
			await AuthService.addProspect({
				firstName: (firstName || '').trim(),
				lastName: (lastName || '').trim(),
				email: (email || '').toLowerCase().trim(),
				phone,
				programAlias: program,
				eventName: 'Checkout Started'
			});

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}

	public async registration(req: Request, res: Response, next: NextFunction) {
		try {
			const data = await AuthService.registration({
				firstName: (req.body.first_name || '').trim(),
				lastName: (req.body.last_name || '').trim(),
				email: (req.body.email || '').toLowerCase().trim(),
				rawPassword: req.body.password,
				phone: req.body.phone,
				userTypeId: req.body.user_type_id,
			}, requestIp.getClientIp(req));

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				token: data.token,
				user_id: data.user.userId, // eslint-disable-line
				programs: data.programs
			});
		} catch (error) {
			return next(error);
		}
	}

	public async preRegistrationWithPlan(req: Request, res: Response, next: NextFunction) {
		try {

			let utm = null;
			if (req.body.utm_source) {
				utm = {
					utmSource: req.body.utm_source,
					utmMedium: req.body.utm_medium,
					utmCampaign: req.body.utm_campaign,
					utmTerm: req.body.utm_term,
					utmContent: req.body.utm_content,
				};
			}

			// HACK
			let programAliasTemp = req.body.program;
			if (req.body.program === '678') {
				programAliasTemp = 'member';
			}

			await AuthService.preRegistration({
				firstName: (req.body.first_name || '').trim(),
				lastName: (req.body.last_name || '').trim(),
				email: (req.body.email || '').toLowerCase().trim(),
				phone: req.body.phone,
				school: req.body.school ? req.body.school.trim() : null,
				programAlias: programAliasTemp,
				athletePlanId: null,
				setPlan: true,
			}, utm);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}

	public async preRegistrationWithoutPlan(req: Request, res: Response, next: NextFunction) {
		try {
			let utm = null;
			if (req.body.utm_source) {
				utm = {
					utmSource: req.body.utm_source,
					utmMedium: req.body.utm_medium,
					utmCampaign: req.body.utm_campaign,
					utmTerm: req.body.utm_term,
					utmContent: req.body.utm_content,
				};
			}

			await AuthService.preRegistration({
				firstName: (req.body.first_name || '').trim(),
				lastName: (req.body.last_name || '').trim(),
				email: (req.body.email || '').toLowerCase().trim(),
				phone: req.body.phone,
				school: req.body.school ? req.body.school.trim() : null,
				address: req.body.address ? req.body.address.trim() : null,
				city: req.body.city ? req.body.city.trim() : null,
				state: req.body.state ? req.body.state.trim() : null,
				zipCode: req.body.zip_code ? req.body.zip_code.trim() : null,
				country: req.body.country ? req.body.country.trim() : null,
				programAlias: req.body.program,
				athletePlanId: req.body.athlete_plan_id,
				setPlan: false,
			}, utm);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}

	public async emailConfirm(req: Request, res: Response, next: NextFunction) {
		try {
			const token = req.body.code;

			await AuthService.emailConfirm(token);

			res.status(HttpStatusCodes.ACCEPTED).json({
				message: 'OK'
			});
		} catch (error) {
			return next(error);
		}
	}

	public async resendConfirmation(req: Request, res: Response, next: NextFunction) {
		try {
			const email = (req.body.email || '').toLowerCase().trim();

			await AuthService.resendConfirmation(email);

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}

	public async inviteConfirm(req: Request, res: Response, next: NextFunction) {
		try {
			const token = req.body.code;
			const password = req.body.password;

			await AuthService.inviteConfirm(token, password);

			res.status(HttpStatusCodes.ACCEPTED).json({
				message: 'OK'
			});
		} catch (error) {
			return next(error);
		}
	}

	public async resetPassword(req: Request, res: Response, next: NextFunction) {
		try {
			const email = (req.body.email || '').toLowerCase().trim();

			await AuthService.resetPassword(email);

			res.status(HttpStatusCodes.ACCEPTED).json({
				message: 'OK'
			});
		} catch (error) {
			return next(error);
		}
	}

	// Change password after reset password with temp code
	public async changePassword(req: Request, res: Response, next: NextFunction) {
		try {
			const key = req.body.key;
			const password = req.body.password;

			const userTypeId = await AuthService.changePassword(key, password);

			res.status(HttpStatusCodes.ACCEPTED).json({
				message: 'OK',
				user_type_id: userTypeId, // eslint-disable-line
			});
		} catch (error) {
			return next(error);
		}
	}

	// Update password for current user
	public async changeMyPassword(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;
			const oldPassword = req.body.old_password;
			const newPassword = req.body.new_password;

			await AuthService.changeMyPassword(currentUser, oldPassword, newPassword);

			res.status(HttpStatusCodes.ACCEPTED).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}

	public async loginAsCoach(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = req.body.user_id;

			const token = await AuthService.loginAsCoach(userId, requestIp.getClientIp(req));

			res.status(HttpStatusCodes.OK).json({
				message: 'OK',
				token
			});
		} catch (error) {
			return next(error);
		}
	}

	public async acceptPolicy(req: IRequest, res: Response, next: NextFunction) {
		try {
			const currentUser = req.user;

			await AuthService.acceptPolicy(currentUser);

			res.status(HttpStatusCodes.ACCEPTED).json({
				message: 'OK',
			});
		} catch (error) {
			return next(error);
		}
	}

}
