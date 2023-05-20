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
            logger.warn(`Error: ${err} trying to get user chat`)
        };
    };

    async addMessage(username, type, body) {

        try {
            await connectToDb();
            const newMessage = new chatModel({
                username: username,
                type: type,
                body: body
            });
            await newMessage.save();
            return true;
        } catch(err) {
            logger.warn(`Error: ${err} trying to add message to db`);
        };
    };
};

export const chatDao = new ChatDao();