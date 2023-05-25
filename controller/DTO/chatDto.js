import { chatDao } from "../DAO/chatDao.js";

const getAllChatsByUserDto = async (username) => {
    const chats = await chatDao.getAllChatsByUserDto(username);
    return chats;
};

const addMessageDto = async (username, type, body) => {
    const chatsToAdd = await chatDao.addMessage(username, type, body);
    return chatsToAdd;
};

export {getAllChatsByUserDto, addMessageDto};