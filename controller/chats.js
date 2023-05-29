import { getAllChatsByUserDto, addMessageDto } from "./DTO/chatDto.js";

const getAllChatsByUserController = async (username) => {
  const chats = await getAllChatsByUserDto(username);
  return chats;
};

const addMessageController = async (username, body) => {
  const addMessage = await addMessageDto(username, body);
  return addMessage;
};

export { getAllChatsByUserController, addMessageController };
