import {orderDao} from '../DAO/orderDao.js';


export const newOrderDto = async(order) => {
    const orders = await orderDao.orders;
    const newOrder = await orders.newOrder(order);
    return newOrder;
};

