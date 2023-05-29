import connectToDb from "../../DB/config/connectToDb.js";
import { orderModel } from "../../DB/model/modelSchema.js";
import logger from "../../logger/logger.js";

class OrderDao {
  getOrderByUsername = async (username) => {
    try {
      await connectToDb();
      const orderByUsername = await orderModel.findOne({ username: username });
      return orderByUsername;
    } catch (error) {
      logger.error(
        `${error} --Error intentando encontrar orden de username: ${username}`
      );
    }
  };

  newOrder = async (order) => {
    try {
      await connectToDb();
      const newOrder = new orderModel(order);
      await newOrder.save();
      return newOrder;
    } catch (err) {
      logger.error(`${err} --Error intentando agregar nueva orden ${order}`);
      return false;
    }
  };
}

export const orderDao = new OrderDao();
