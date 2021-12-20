import * as express from 'express';
import AuthController from '../../controllers/authController';

const router = express.Router();
const authController: AuthController = new AuthController();

router.route('/login')
	.post(authController.loginv2);

module.exports = router;
