import * as express from 'express';
import WorkoutController from '../controllers/workoutController';
import StravaController from '../controllers/stravaController';

import authMiddleware from '../middleware/auth';
import isCoachMiddleware from '../middleware/isCoach';

const router = express.Router();
const workoutController: WorkoutController = new WorkoutController();
const stravaController: StravaController = new StravaController();

router.route('/')
	.post(authMiddleware, workoutController.create);

router.route('/types')
	.get(authMiddleware, workoutController.listOfWorkoutTypes);

router.route('/:id')
	.get(authMiddleware, workoutController.getById)
	.put(authMiddleware, workoutController.updateById)
	.delete(authMiddleware, workoutController.deleteById);

router.route('/:id/status')
	.post(authMiddleware, workoutController.changeStatus);

router.route('/:id/results')
	.put(authMiddleware, workoutController.updateResults);

router.route('/:id/mark')
	.post(authMiddleware, isCoachMiddleware, workoutController.mark)
	.delete(authMiddleware, isCoachMiddleware, workoutController.unmark);

router.route('/:id/like')
	.post(authMiddleware, isCoachMiddleware, workoutController.like)
	.delete(authMiddleware, isCoachMiddleware, workoutController.unlike);

router.route('/:id/copy')
	.post(authMiddleware, workoutController.copy);

router.route('/:id/pace_chart')
	.get(authMiddleware, stravaController.getActivityChart);

router.route('/:id/athlete_notes')
	.get(authMiddleware, workoutController.getAthleteNotes)
	.put(authMiddleware, workoutController.updateAthleteNotes);

router.route('/:user_id/workouts')
	.get(authMiddleware, workoutController.getWorkoutsByAthleteId);

router.route('/:id/update_message')
	.post(authMiddleware, isCoachMiddleware, workoutController.updateWorkoutMessage);


module.exports = router;
