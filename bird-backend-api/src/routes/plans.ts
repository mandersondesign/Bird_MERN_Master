import * as express from 'express';
import PlanController from '../controllers/planController';
import AthleteController from '../controllers/athleteController';
import authMiddleware from '../middleware/auth';
import isCoachMiddleware from '../middleware/isCoach';

const router = express.Router();
const planController: PlanController = new PlanController();
const athleteController: AthleteController = new AthleteController();

router.route('/')
	.get(authMiddleware, planController.listOfTemplates);

router.route('/recommended')
	.get(authMiddleware, planController.getRecommendedPlan);

router.route('/:plan_template_id/athletes')
	.get(authMiddleware, athleteController.getAthletesByPlanTemplateId);

router.route('/:plan_id/weeks')
	.post(authMiddleware, planController.addWeekToPlan);

router.route('/:plan_id/weeks/:week_id')
	.delete(authMiddleware, planController.deleteWeek);

router.route('/:plan_id/weeks/:week_id/copy')
	.put(authMiddleware, planController.copyWeek);

router.route('/:plan_id/sort')
	.put(authMiddleware, isCoachMiddleware, planController.updateSortInPlan);

router.route('/:plan_id/paces')
	.get(authMiddleware, planController.getPacesByPlanId)
	.put(authMiddleware, planController.updatePacesByPlanId);

router.route('/:plan_id/endplan')
	.post(authMiddleware, planController.endPlanById);


module.exports = router;
