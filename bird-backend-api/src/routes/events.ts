import * as express from 'express';
import EventController from '../controllers/eventController';
import authMiddleware from '../middleware/auth';

const router = express.Router();
const eventController: EventController = new EventController();

router.route('/')
	.get(authMiddleware, eventController.list);

router.route('/important_goals')
	.get(eventController.listOfImportantGoals);

module.exports = router;
