import { Request } from 'express';
import Session from '../models/user/session';
import User from '../models/user/user';

export default interface IRequest extends Request {
	user: User;

	session: Session;
}
