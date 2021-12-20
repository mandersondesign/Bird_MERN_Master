import * as express from 'express';
import authMiddleware from '../middleware/auth';
import MessageController from '../controllers/messageController';

const router = express.Router();
const messageController: MessageController = new MessageController();

router.route('/send-message-group')
	.post(authMiddleware, messageController.sendMessageToGroup);

router.route('/receive')
	.post(messageController.receiveMessageFromAthlete);

router.route('/send-dm')
	.post(authMiddleware, messageController.sendDM);

router.route('/coach/messages')
	.get(authMiddleware, messageController.getCoachMessages);

router.route('/read')
	.post(authMiddleware, messageController.setReadDate);

router.route('/:athlete/sms_notifications')
	.post(authMiddleware, messageController.setSmsNotificationStatus);


module.exports = router;
