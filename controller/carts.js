import {createCartDto, getCartByUsernameDto, updateCartDto, deleteCartDto, deleteCartItemDto} from './DTO/cartDto.js';
import {getAllProductsController} from '../controller/products.js'

const createCartController = async(username, address ) => {
    try {
    const newCart = await createCartDto(username, address);
    return newCart;
    } catch (error) {
    throw new Error (`Error: ${error}`);
    };
};

const getCartByUsernameController = async(username) => {
    try {
    const cart = await getCartByUsernameDto(username);
    return cart;
    } catch (error) {
        throw new Error (`Error: ${error}`);
    };
};

const updateCartController = async (cartId, updatedCartData) => {
    try {
    const updatedCart = await updateCartDto(cartId, updatedCartData);
    return updatedCart;
    } catch (error) {
        throw new Error (`Error: ${error}`);
    };
};

const deleteCartController = async(cartId) => {
    try {
    const deletedCart = await deleteCartDto(cartId);
    return deletedCart;
    } catch (error) {
        throw new Error (`Error: ${error}`);
    };
};

const deleteCartItemController = async(cartId, itemName) => {
    try {
    const updatedCart = await deleteCartItemDto(cartId, itemName);
    return updatedCart;
    } catch (error) {
        throw new Error (`Error: ${error}`);

    };
};

const newOrderController = async(username) => {
    const cart = await getCartByUsernameController(username);
    if(cart.products.length === 0) return false;

    const products = await getAllProductsController();
    

}

export { createCartController, getCartByUsernameController, updateCartController, deleteCartController, deleteCartItemController, newOrderController
};
