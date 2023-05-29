import {createCartDto, getCartByUsernameDto, updateCartDto, deleteCartDto, deleteCartItemDto} from './DTO/cartDto.js';
import logger from '../logger/logger.js';

const createCartController = async(username, address ) => {
    try {
    const newCart = await createCartDto(username, address);
    return newCart;
    } catch (error) {
    logger.error(`${error} --Error al intentar crear carrito controller`);
    };
};

const getCartByUsernameController = async(username) => {
    try {
    const cart = await getCartByUsernameDto(username);
    return cart;
    } catch (error) {
        logger.error(`${error} --Error al intentar encontrar usuario controller: ${username} `);
    };
};

const updateCartController = async (cartId, updatedCartData) => {
    try {
    const updatedCart = await updateCartDto(cartId, updatedCartData);
    return updatedCart;
    } catch (error) {
        logger.error(`${error} --Error al intentar actualizar carrito controller id: ${cartId}`);
    };
};

const deleteCartController = async(cartId) => {
    try {
    const deletedCart = await deleteCartDto(cartId);
    return deletedCart;
    } catch (error) {
        logger.error(`${error} --Error al intentar eliminar carrito controller id: ${cartId}`);
    };
};

const deleteCartItemController = async(cartId, itemTitle) => {
    try {
    const updatedCart = await deleteCartItemDto(cartId, itemTitle);
    return updatedCart;
    } catch (error) {
        logger.error(`${error} --Error al intentar borrar item de carrito controller id: ${cartId}`);
    };
};

export { createCartController, getCartByUsernameController, updateCartController, deleteCartController, deleteCartItemController};
