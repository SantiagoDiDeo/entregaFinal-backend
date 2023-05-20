import { handleSendEmail } from '../helpers/sendEmail.js';
import { newOrderDto } from './DTO/orderDto.js';
import { getCartByUsernameController } from './carts.js';
import { getAllProductsController } from './products.js';
import {emailUser} from '../environments/env.js';


export const newOrderController = async (username) => {

    const cart = await getCartByUsernameController(username);
    if ( cart.products.length === 0 ) return false;

    const products = await getAllProductsController();
    const orderArray = cart.products.map(cartItem => {
        const productsDetail = products.find(product => product.id === cartItem.id)
        return {
            ...cartItem,
            price: productsDetail.price,
            title: productsDetail.title,
        };
    });

    const order = {
        username: username,
        address: address,
        products: orderArray,
    };

    const orderResult = await newOrderDto(order);
    const text = `tu orden fue creada: ${JSON.stringify(orderResult, null, 2)}`
    const subject = `nuedo pedido de : ${username}`
    handleSendEmail(text, subject, emailUser)

    return ( responseOrder & responseDelete) ? true : false;
};