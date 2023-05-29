import { Server } from "socket.io";
import {
  getAllChatsByUserController,
  addMessageController,
} from "../controller/chats.js";
import logger from "../logger/logger.js";

export const initializeWebsockets = (httpServer) => {
  const io = new Server(httpServer, { cors: { origin: "*" } });

  io.on("connection", async (socket) => {
    logger.info(`New connection id: ${socket.id}`);

    socket.on("online", async (username) => {
      const allChats = await getAllChatsByUserController(username);
      socket.emit("chat", allChats);
    });

    socket.emit("chat", async (msg) => {
      allChats.push({
        username: username,
        body: msg.body,
      });
      socket.emit("chat", allChats);
    });

    socket.on("newChat", async (username) => {
      const allChats = await getAllChatsByUserController(username);
      const chatToAdd = await addMessageController(username, "user", msg.body);
      io.sockets.emit("newChat", chatToAdd);
    });

    socket.on("connect", () => {
      console.log("socket connected");
    });

    socket.on("chat", async (data) => {
      htmlToRender = "";
      await data.forEach((element) => {
        htmlToRender =
          htmlToRender +
          `
                <tr>
                    <th><h1 class='user'>${element.username}</h1></th>
                    <th><h1 class='mensaje'>${element.message}</h1></th>
                </tr>
                `;
      });

      document.getElementById("message").innerHTML = htmlToRender;
    });
    const addMessage = async (messageToAdd) => {
      messageToAdd = {
        username: userEmail.value,
        body: userMensaje.value,
      };
      if (messageToAdd.username) {
        await socket.emit("newMessage", messageToAdd);
      }
    };
  });
};
