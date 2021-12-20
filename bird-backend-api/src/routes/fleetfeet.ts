import * as express from 'express';
import FleetfeetController from '../controllers/fleetfeetController';
import authMiddleware from '../middleware/auth';

const router = express.Router();
const fleetfeetController: FleetfeetController = new FleetfeetController();

router.route('/survey_questions/')
	.get(fleetfeetController.listOfSurveyQuestions);

router.route('/events/:alias')
	.get(fleetfeetController.getEventByAlias);

router.route('/events/:alias/survey_questions/')
	.get(fleetfeetController.listOfSurveyQuestions);

router.route('/events/:alias/waiver/')
	.get(fleetfeetController.getWaiver);

router.route('/registration')
	.post(fleetfeetController.registration);

router.route('/pay')
	.post(authMiddleware, fleetfeetController.pay);

router.route('/test')
	.get(authMiddleware, fleetfeetController.testFleetFeetReport);

module.exports = router;
