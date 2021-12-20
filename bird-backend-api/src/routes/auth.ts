import * as express from 'express';
import AuthController from '../controllers/authController';

import authMiddleware from '../middleware/auth';
import isAdminMiddleware from '../middleware/isAdmin';

const router = express.Router();
const authController: AuthController = new AuthController();

router.route('/login')
	.post(authController.login);

router.route('/logout')
	.post(authMiddleware, authController.logout);

router.route('/prospect')
	.post(authController.addProspect);

router.route('/registration')
	.post(authController.registration);

router.route('/preRegistrationWithPlan')
	.post(authController.preRegistrationWithPlan);

router.route('/preRegistrationWithoutPlan')
	.post(authController.preRegistrationWithoutPlan);

router.route('/emailConfirm')
	.post(authController.emailConfirm);

router.route('/resendConfirmation')
	.post(authController.resendConfirmation);

router.route('/resetPassword')
	.post(authController.resetPassword);

router.route('/changePassword')
	.post(authController.changePassword);

router.route('/inviteConfirm')
	.post(authController.inviteConfirm);

router.route('/loginAsCoach')
	.post(authMiddleware, isAdminMiddleware, authController.loginAsCoach);


module.exports = router;
