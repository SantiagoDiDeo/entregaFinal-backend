import express from "express";
import passport from "../DB/config/auth.js";

import logger from "../logger/logger.js";
import { getAllChatsByUserController } from "../controller/chats.js";
import { addMessageController } from "../controller/chats.js";

const { Router } = express;
const chatRouter = Router();

chatRouter.use(passport.initialize());
chatRouter.use(passport.session());

chatRouter.get("/", async (req, res) => {
  try {
    res.render("chat.handlebars");
  } catch (error) {
    logger.error(`${error} --Error al traer chats`);
  }
});

chatRouter.get("/:username", async (req, res) => {
  //falta passport.authenticate
  try {
    const { username } = req.params;
    const chats = await getAllChatsByUserController(username);
    res.render("chat", { chats });
  } catch (error) {
    logger.error(`${error} --Error al buscar chat por params.username`);
  }
});

chatRouter.post("/:username/:msg", async (req, res) => {
  //falta passport.authenticate
  try {
    const username = req.params.username;
    const messageToAdd = await addMessageController(username, req.params.msg);
    res.status(200).send(messageToAdd);
  } catch (error) {
    logger.error(`${error} --Error al intentar agregar chats a db route`);
  }
});

export default chatRouter;
