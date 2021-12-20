import * as express from 'express';
import RunsignupController from '../controllers/runsignupController';
import authMiddleware from '../middleware/auth';
import isAdminMiddleware from '../middleware/isAdmin';

const router = express.Router();
const runsignupController: RunsignupController = new RunsignupController();

router.route('/race')
	.post(authMiddleware, isAdminMiddleware, runsignupController.importRunsignupData);

module.exports = router;
