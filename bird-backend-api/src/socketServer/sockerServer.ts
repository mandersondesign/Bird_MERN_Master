import { Socket } from 'socket.io';
import { getConnection, Repository } from 'typeorm';
import env from '../env';
import * as jwt from 'jsonwebtoken';
import IDecodedToken from '../interfaces/IDecodedToken';
import Session from '../models/user/session';
import app from '../app';


export default class SocketServer {

	public initSocket() {
		const io = app.get('socketIo');
		io.on('connection', async (socket: Socket) => {
			if (!socket.handshake.query.token) {
				socket.disconnect();
			}
			if (!socket.disconnected) {
				const token: string = String(socket.handshake.query.token).toString();
				const data: IDecodedToken = Object(jwt.verify(token, env.JWT_SECRET));
				const sessionRepository: Repository<Session> = getConnection().getRepository(Session);
				const session: Session = await sessionRepository.findOne({
					sessionId: data.session_id
				}, {
					relations: ['user']
				});

				if (!session || !session.isActive || !session.user) {
					socket.disconnect();
				}

				if (!session.user.isActive) {
					socket.disconnect();
				}

				if (!socket.disconnected) {
					socket.data = session.user;
					io.to(socket.id).emit('new_message', { id: socket.id, msg: `You are connected, your id is ${socket.id}`, type: 'init' });
				}
			}
		});
	}
}
