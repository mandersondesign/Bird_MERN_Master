import * as express from 'express';
import WeekController from '../controllers/weekController';
import DefaultController from '../controllers/defaultController';
import PlanController from '../controllers/planController';

import authMiddleware from '../middleware/auth';
import isAthleteMiddleware from '../middleware/isAthlete';

const router = express.Router();
const weekController: WeekController = new WeekController();
const defaultController: DefaultController = new DefaultController();
const planController: PlanController = new PlanController();


router.route('/:id')
	.get(authMiddleware, weekController.getById)
	.put(authMiddleware, weekController.updateById);

router.route('/:id/publish') // legacy
	.post(authMiddleware, defaultController.mock);

router.route('/:id/chart')
	.get(authMiddleware, planController.getDaysMilesData);

router.route('/:id/sort')
	.put(authMiddleware, isAthleteMiddleware, planController.updateSortInWeek);

module.exports = router;
