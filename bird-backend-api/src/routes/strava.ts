import * as express from 'express';
import StravaController from '../controllers/stravaController';
import authMiddleware from '../middleware/auth';

const router = express.Router();
const stravaController: StravaController = new StravaController();

router.route('/redirect')
	.get(authMiddleware, stravaController.oauthRedirect);

router.route('/exchange_token')
	.get(stravaController.exchangeToken);

router.route('/deauthorize')
	.post(authMiddleware, stravaController.deauthorize);

router.route('/test')
	.get(stravaController.test);

router.route('/webhook')
	.post(stravaController.webhook)
	.get(stravaController.verifyWebhook);

router.route('/activities')
	.get(authMiddleware, stravaController.listOfActivities);

router.route('/match')
	.post(authMiddleware, stravaController.match);

router.route('/sync')
	.post(authMiddleware, stravaController.sync);

module.exports = router;
