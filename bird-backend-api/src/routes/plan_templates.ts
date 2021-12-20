import * as express from 'express';
import PlanController from '../controllers/planController';
import AthleteController from '../controllers/athleteController';
import authMiddleware from '../middleware/auth';
import isCoachMiddleware from '../middleware/isCoach';
import updatePlanTemplateMiddleware from '../middleware/updatePlanTemplate';


const router = express.Router();
const planController: PlanController = new PlanController();
const athleteController: AthleteController = new AthleteController();

router.route('/')
	.get(authMiddleware, planController.listOfCoachTemplates)
	.post(authMiddleware, isCoachMiddleware, planController.createNewTemplate);

router.route('/:plan_template_id')
	.get(authMiddleware, isCoachMiddleware, planController.getPlanTemplateById)
	.put(authMiddleware, isCoachMiddleware, updatePlanTemplateMiddleware, planController.updatePlanTemplateById)
	.delete(authMiddleware, isCoachMiddleware, updatePlanTemplateMiddleware, planController.deletePlanTemplateById);

router.route('/:plan_template_id/athletes')
	.get(authMiddleware, athleteController.getAthletesByPlanTemplateId);

router.route('/:plan_template_id/sort')
	.put(authMiddleware, isCoachMiddleware, updatePlanTemplateMiddleware, planController.updateSortInTemplate);

router.route('/:plan_template_id/phases')
	.post(authMiddleware, isCoachMiddleware, updatePlanTemplateMiddleware, planController.addPhaseToTemplate);

router.route('/:plan_template_id/phases/:phase_id')
	.delete(authMiddleware, isCoachMiddleware, updatePlanTemplateMiddleware, planController.deletePhaseTemplate)
	.put(authMiddleware, isCoachMiddleware, updatePlanTemplateMiddleware, planController.updatePhaseTemplate);

router.route('/:plan_template_id/phases/:phase_id/weeks')
	.post(authMiddleware, isCoachMiddleware, updatePlanTemplateMiddleware, planController.addWeekToTemplate);

router.route('/:plan_template_id/phases/:phase_id/weeks/:week_id')
	.delete(authMiddleware, isCoachMiddleware, updatePlanTemplateMiddleware, planController.deleteWeekTemplate)
	.put(authMiddleware, isCoachMiddleware, updatePlanTemplateMiddleware, planController.updateWeekTemplate);

router.route('/:plan_template_id/phases/:phase_id/weeks/:week_id/workouts')
	.post(authMiddleware, isCoachMiddleware, updatePlanTemplateMiddleware, planController.addWorkoutToTemplate);

router.route('/:plan_template_id/phases/:phase_id/weeks/:week_id/workouts/:workout_id')
	.delete(authMiddleware, isCoachMiddleware, updatePlanTemplateMiddleware, planController.deleteWorkoutTemplate)
	.put(authMiddleware, isCoachMiddleware, updatePlanTemplateMiddleware, planController.updateWorkoutTemplate);

router.route('/:workout_id/update_message')
	.put(authMiddleware, isCoachMiddleware, planController.updateWorkoutTemplateMessage);

module.exports = router;
