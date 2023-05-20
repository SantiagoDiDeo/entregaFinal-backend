import { getAllChatsByUserDto, addMessageDto } from "./DTO/chatDto";


const getAllChatsByUserController = async (username) => {
    const chats = await getAllChatsByUserDto(username);
    return chats;
};

const addMessageController = async (username, type, body) => {
    const addMessage = await addMessageDto(username, type, body);
    return addMessage;
};

export {getAllChatsByUserController, addMessageController};