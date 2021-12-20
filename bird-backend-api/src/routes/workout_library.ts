import * as express from 'express';
import WorkoutLibraryController from '../controllers/workoutLibraryController';

import authMiddleware from '../middleware/auth';
import isCoachMiddleware from '../middleware/isCoach';

const router = express.Router();
const workoutLibraryController: WorkoutLibraryController = new WorkoutLibraryController();

router.route('/')
	.post(authMiddleware, isCoachMiddleware, workoutLibraryController.add)
	.get(authMiddleware, isCoachMiddleware, workoutLibraryController.list);

router.route('/:id')
	.get(authMiddleware, isCoachMiddleware, workoutLibraryController.getById)
	.put(authMiddleware, isCoachMiddleware, workoutLibraryController.updateById)
	.delete(authMiddleware, isCoachMiddleware, workoutLibraryController.deleteById);

module.exports = router;
