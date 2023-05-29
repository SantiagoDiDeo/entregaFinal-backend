import connectToDb from '../../DB/config/connectToDb.js';
import {chatModel} from '../../DB/model/modelSchema.js';
import logger from '../../logger/logger.js';

class ChatDao {

    async getAllChatsByUser(username) {
        try {
            await connectToDb();
            const chats = await chatModel.find({ username: username});
            return chats;
        } catch (err) {
            logger.error(`${err} --Error intentando encontrar chat de username: ${username}`);
        };
    };

    async addMessage(username, body) {

        try {
            await connectToDb();
            const newMessage = new chatModel({
                username: username,
                body: body
            });
            await newMessage.save();
            return true;
        } catch(err) {
            logger.error(`${err} --Error intentando guardar chat de username: ${username}`);
        };
    };
};

export const chatDao = new ChatDao();