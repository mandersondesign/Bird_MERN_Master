import * as express from 'express';
import CoachController from '../controllers/coachController';
import AthleteController from '../controllers/athleteController';
import UserController from '../controllers/userController';
import authMiddleware from '../middleware/auth';
import isCoachMiddleware from '../middleware/isCoach';
import isAthleteMiddleware from '../middleware/isAthlete';
import isAdminMiddleware from '../middleware/isAdmin';

const router = express.Router();
const coachController: CoachController = new CoachController();
const athleteController: AthleteController = new AthleteController();
const userController: UserController = new UserController();

router.route('/me/athletes')
	.get(authMiddleware, isCoachMiddleware, athleteController.list);

router.route('/me/athletes_all')
	.get(authMiddleware, athleteController.listAllAthletes);

router.route('/me/athletes/unassigned')
	.get(authMiddleware, isCoachMiddleware, athleteController.unassignedList);

router.route('/me/athletes/meta')
	.get(authMiddleware, isCoachMiddleware, coachController.getMetaForAtletes);

router.route('/request_callback')
	.post(authMiddleware, isAthleteMiddleware, coachController.requestCallback);

router.route('/invite')
	.post(authMiddleware, isAdminMiddleware, coachController.sendInvite);

router.route('/:coach_id')
	.get(authMiddleware, coachController.getCoachById);

router.route('/:coach_id/info')
	.get(authMiddleware, isCoachMiddleware, coachController.getCoachInfoById)
	.put(authMiddleware, isCoachMiddleware, coachController.updateCoachInfoById);

router.route('/:coach_id/measurement')
	.put(authMiddleware, isCoachMiddleware, coachController.updateMeasurement);

router.route('/:coach_id/cards')
	.get(authMiddleware, isCoachMiddleware, coachController.getListOfCards);

router.route('/:coach_id/image')
	.post(authMiddleware, isAdminMiddleware, coachController.uploadCoachImage);

router.route('/:coach_id/custom_questions')
	.get(authMiddleware, coachController.getCustomQuestions)
	.put(authMiddleware, coachController.updateCustomQuestions);

router.route('/:coach_id/sms_notifications')
	.post(authMiddleware, userController.setSmsNotificationStatus);

module.exports = router;
