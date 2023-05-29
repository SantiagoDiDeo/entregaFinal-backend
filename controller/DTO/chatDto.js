import { chatDao } from "../DAO/chatDao.js";

const getAllChatsByUserDto = async (username) => {
    const chats = await chatDao.getAllChatsByUser(username);
    return chats;
};

const addMessageDto = async (username,body) => {
    const chatsToAdd = await chatDao.addMessage(username, body);
    return chatsToAdd;
};

export {getAllChatsByUserDto, addMessageDto};