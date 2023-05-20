import { Server } from 'socket.io';
import { getChatsController, addChatsController } from '../controllers/chatController.js';
import logger from '../logger/logger.js';

export const initializeWebsockets = (httpServer) => {

    const io = new Server(httpServer, { cors: { origin: '*' } });

    io.on('connection', async (socket) => {
        logger.info(`New connection id: ${socket.id}`);

        socket.on('newChat', async (msg) => {
            await getChatsController();
            const chatToAdd = await addChatsController( msg.username, 'user', msg.body);
            io.sockets.emit('newChat', chatToAdd);
        });
    });
};