import 'module-alias/register';
import { createServer } from 'http';
import { createConnection, getConnectionOptions } from 'typeorm';
import { Server } from 'socket.io';
import SocketServer from './socketServer/sockerServer';
import app from './app';
import env from './env';

const PORT = env.PORT;

(async () : Promise<any> => {
	const connectionOptions = await getConnectionOptions();

	createConnection(connectionOptions).then(async () => {
		const httpServer = createServer(app);
		const io = new Server(httpServer, {
			cors: {
				origin: env.FRONTEND_URL,
				methods: ['GET', 'POST'],
				credentials: true,
			},
			transports: ['websocket'],
		});
		app.set('socketIo', io);

		const socketService = new SocketServer();
		socketService.initSocket();

		httpServer.listen(PORT, () =>
			console.info(`Server running on port ${PORT}`)
		);

	}).catch((error) => console.log('Error: ', error));
})();
