import express from "express";
import passport from "../DB/config/auth.js";
import { authenticateToken } from "../DB/config/auth.js";
import {
  deleteCartController,
  deleteCartItemController,
  getCartByUsernameController,
} from "../controller/carts.js";
import {
  getOrderByUsernameController,
  newOrderController,
} from "../controller/orders.js";
import logger from "../logger/logger.js";

const { Router } = express;
const cartRouter = Router();

cartRouter.use(passport.initialize());
cartRouter.use(passport.session());

cartRouter.get("/", async (req, res) => {
  //falta passport authenticate 'jwt'
  const username = "juancarlos1"; //aca va req.session.passport.user.username;
  const cart = await getCartByUsernameController(username);
  res.render("cart", { cart });
});

cartRouter.post("/order", async (req, res) => { //falta passport authenticate 'jwt'
  try {
    const username = "juancarlos1"; // aca va req.session.passport.user.username
    const order = await newOrderController(username);
    const realizedOrder = await getOrderByUsernameController(username);
    res.send(
      `orden de compra realizada, ${JSON.stringify(realizedOrder, null, 2)}`
    );
  } catch (error) {
    logger.error(
      `${error} --Error al intentar realizar "post" de orden ${order}`
    );
  }
});

cartRouter.delete("/:id/:title", async (req, res) => { //falta passport authenticate 'jwt'
  try {
    const deleted = await deleteCartItemController(
      req.params.id,
      req.params.title
    );
    res.status(200).send(deleted);
  } catch (error) {
    logger.error(`${error} --Error al intentar borrar producto carrito route`);
  }
});

cartRouter.delete("/:id", async (req, res) => { //falta passport authenticate 'jwt'
  try {
    const { id } = req.params;
    const deletedCart = await deleteCartController(id);
    res.status(200).send({ id: deletedCart.id });
  } catch (error) {
    logger.error(`${error} --Error al intentar borrar carrito route`);
  }
});

export default cartRouter;
