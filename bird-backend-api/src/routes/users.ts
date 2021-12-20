import * as express from 'express';
import UserController from '../controllers/userController';
import PlanController from '../controllers/planController';
import AuthController from '../controllers/authController';

import authMiddleware from '../middleware/auth';
import isAthleteMiddleware from '../middleware/isAthlete';
import isAdminMiddleware from '../middleware/isAdmin';

const router = express.Router();
const userController: UserController = new UserController();
const planController: PlanController = new PlanController();
const authController: AuthController = new AuthController();

router.route('/')
	.post(authMiddleware, userController.create)
	.get(authMiddleware, isAdminMiddleware, userController.list);

router.route('/me')
	.get(authMiddleware, userController.getMe);

router.route('/:id')
	.put(authMiddleware, userController.updateById)
	.get(authMiddleware, userController.getUserById);

router.route('/me/avatar')
	.post(authMiddleware, userController.uploadAvatar);

router.route('/me/coach')
	.get(authMiddleware, userController.getMyCoach);

router.route('/me/info')
	.put(authMiddleware, isAthleteMiddleware, userController.updateUserInfo)
	.patch(authMiddleware, isAthleteMiddleware, userController.patchUserInfo);

router.route('/me/password')
	.put(authMiddleware, authController.changeMyPassword);

router.route('/me/accept_policy')
	.post(authMiddleware, authController.acceptPolicy);

router.route('/me/sms_notifications')
	.post(authMiddleware, userController.setSmsNotificationStatus);

router.route('/me/push_notification')
	.get(authMiddleware, userController.getPushNotification)
	.post(authMiddleware, userController.addPushNotification);

router.route('/:alias/info')
	.get(authMiddleware, userController.getUserInfo);

router.route('/:alias/plan')
	.get(authMiddleware, planController.getPlanByUser);

router.route('/:alias/plan/meta')
	.get(authMiddleware, planController.getMetaForPlan);

router.route('/:alias/plan/chart')
	.get(authMiddleware, planController.getWeeksMilesData);

router.route('/:alias/plan/chart_by_day')
	.get(authMiddleware, planController.getPlanChart);

router.route('/:alias/weeks/current')
	.get(authMiddleware, planController.getCurrentWeek);

router.route('/:alias/weeks/number/:week_number')
	.get(authMiddleware, planController.getWeekByNumber);

module.exports = router;
