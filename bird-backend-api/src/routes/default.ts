import * as express from 'express';
import DefaultController from '../controllers/defaultController';
import authMiddleware from '../middleware/auth';
import isAdminMiddleware from '../middleware/isAdmin';

import * as multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();
const defaultController: DefaultController = new DefaultController();


router.route('/version')
	.get(defaultController.getVersion);

router.route('/time')
	.get(defaultController.getCurrentTime);

router.route('/search')
	.get(authMiddleware, defaultController.search);

router.route('/paces')
	.get(authMiddleware, defaultController.listOfPaces);

router.route('/twilio/sms')
	.post(defaultController.twilioSMS);

router.route('/twilio/test')
	.post(authMiddleware, isAdminMiddleware, defaultController.twilioTest);

router.route('/twilio/test_msg')
	.post(authMiddleware, isAdminMiddleware, defaultController.twilioTestMsg);

router.route('/push_notification/test')
	.post(authMiddleware, defaultController.sendTestPush);

router.route('/push_notification/chat')
	.post(authMiddleware, defaultController.sendPushFromChat);

router.route('/chat/file')
	.post(authMiddleware, defaultController.uploadFile);

router.route('/support/invite')
	.post(authMiddleware, upload.single('file'), defaultController.batchInvite);

router.route('/support/copy_plan_template')
	.post(authMiddleware, isAdminMiddleware, defaultController.copyPlanTemplate);

router.route('/zapier/invite')
	.post(defaultController.zapierInvite);

router.route('/sendbird/webhook')
	.post(defaultController.sendbirdWebhook);

router.route('/support/update_messages_based_on_template')
	.post(authMiddleware, isAdminMiddleware, defaultController.updatePlanMessagesByTemplate);

module.exports = router;
