import connectToDb from '../../DB/config/connectToDb.js';
import { orderModel } from '../../DB/model/modelSchema.js';
import logger from '../../logger/logger.js';


class OrderDao {

    async newOrder (order) {
        try {
            await connectToDb();
            const orderNumber = await orderModel.countDocuments();
            const newOrder = new orderModel({...order, ordernumber: orderNumber + 1});
            await newOrder.save()
            .then(order => logger.info(`purchase order added to database with order ID: ${order._id}`));
            return newOrder;
        } catch (err) {
            logger.error(`${err}: error trying to purchase order`);
            return false;
        };
    };
};

export const orderDao = new OrderDao();