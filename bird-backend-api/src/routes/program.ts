import * as express from 'express';
import ProgramController from '../controllers/programController';

const router = express.Router();
const programController: ProgramController = new ProgramController();

router.route('/pay')
	.post(programController.pay);

router.route('/:alias/coupons/:coupon/')
	.get(programController.checkCoupon);

router.route('/:alias/')
	.get(programController.getProgramByAlias);

module.exports = router;
