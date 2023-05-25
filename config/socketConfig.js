import { Server } from 'socket.io';
import { getAllChatsByUserController, addMessageController } from '../controller/chats.js';
import logger from '../logger/logger.js';

export const initializeWebsockets = (httpServer) => {

    const io = new Server(httpServer, { cors: { origin: '*' } });

    io.on('connection', async (socket) => {
        logger.info(`New connection id: ${socket.id}`);

        socket.on('newChat', async (msg) => {
            await getAllChatsByUserController();
            const chatToAdd = await addMessageController( msg.username, 'user', msg.body);
            io.sockets.emit('newChat', chatToAdd);
        });
    });
};