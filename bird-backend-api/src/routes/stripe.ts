import * as express from 'express';
import StripeController from '../controllers/stripeController';
import authMiddleware from '../middleware/auth';

const router = express.Router();
const stripeController: StripeController = new StripeController();

router.route('/webhook')
	.post(stripeController.webhook);

router.route('/cards')
	.post(authMiddleware, stripeController.updateCard);

module.exports = router;
