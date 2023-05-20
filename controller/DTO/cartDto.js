import { cartDao } from '../DAO/cartDao.js';
import {orderDao} from '../DAO/orderDao.js';

    const createCartDto = async (username, address) => {
    const cart = {
        username: username,
        address: address,
        products: []
    };
    const createdCart = await cartDao.createCart(cart.username, cart.address);
    return createdCart;
    }

    const getCartByUsernameDto = async (username) => {
    const cart = await cartDao.getCartByUsername(username);
    return cart;
    }

    const updateCartDto = async (cartId, updatedCartData) => {
    const updatedCart = await cartDao.updateCart(cartId, updatedCartData);
    return updatedCart;
    }

    const deleteCartDto = async(cartId) => {
    const deletedCart = await cartDao.deleteCart(cartId);
    return deletedCart;
    }

    const deleteCartItemDto = async (cartId, itemName) => {
        try {
            const updatedCart = await cartDao.deleteCartItem(cartId, itemName);
            return updatedCart;
            } catch (error) {
            throw new Error(`Error al eliminar el item del carrito: ${error}`);
            }
        }

   

    export {createCartDto, getCartByUsernameDto, updateCartDto, deleteCartDto, deleteCartItemDto, newOrderDto}
