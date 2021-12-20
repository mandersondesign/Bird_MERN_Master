import * as express from 'express';
import SubscriptionController from '../controllers/subscriptionController';
import authMiddleware from '../middleware/auth';
import isCoachMiddleware from '../middleware/isCoach';

const router = express.Router();
const subscriptionController: SubscriptionController = new SubscriptionController();

router.route('/coach')
	.post(authMiddleware, isCoachMiddleware, subscriptionController.setPlanForCoach)
	.get(subscriptionController.listForCoach);

router.route('/athlete')
	.post(subscriptionController.setSubscriptionPlanForAthlete);

router.route('/athlete/:id')
	.get(subscriptionController.getAthleteSubscriptionPlanById);

module.exports = router;
