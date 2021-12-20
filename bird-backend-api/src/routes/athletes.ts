import * as express from 'express';
import AthleteController from '../controllers/athleteController';
import DefaultController from '../controllers/defaultController';
import authMiddleware from '../middleware/auth';
import isCoachMiddleware from '../middleware/isCoach';

const router = express.Router();
const athleteController: AthleteController = new AthleteController();
const defaultController: DefaultController = new DefaultController();

router.route('/publish')
	.post(authMiddleware, defaultController.mock);

router.route('/invite')
	.post(authMiddleware, isCoachMiddleware, athleteController.sendInvite);

router.route('/:id')
	.get(authMiddleware, athleteController.getById)
	.delete(authMiddleware, isCoachMiddleware, athleteController.deleteById);

router.route('/:id/publish')
	.post(authMiddleware, defaultController.mock);

router.route('/:id/plan')
	.post(authMiddleware, isCoachMiddleware, athleteController.assignPlan);

router.route('/:id/messages')
	.get(authMiddleware, isCoachMiddleware, athleteController.getMessages);

router.route('/:id/note')
	.get(authMiddleware, isCoachMiddleware, athleteController.getNote)
	.post(authMiddleware, isCoachMiddleware, athleteController.setNote);

router.route('/:id/reinvite')
	.post(authMiddleware, isCoachMiddleware, athleteController.resendInvite);

module.exports = router;
