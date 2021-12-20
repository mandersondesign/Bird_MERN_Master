import * as express from 'express';
import AppleController from '../controllers/appleController';
import authMiddleware from '../middleware/auth';

const router = express.Router();
const appleController: AppleController = new AppleController();

/*
router.route('/webhook')
	.post(appleController.webhook);
*/

router.route('/save_payment/:alias')
	.post(authMiddleware, appleController.savePayment);

router.route('/check_payment/:alias')
	.get(authMiddleware, appleController.checkPayment);

module.exports = router;
