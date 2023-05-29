import { orderDao } from "../DAO/orderDao.js";

export const newOrderDto = async (order) => {
  const newOrder = await orderDao.newOrder(order);
  return newOrder;
};

export const getOrderByUsernameDto = async (username) => {
  const order = await orderDao.getOrderByUsername(username);
  return order;
};
