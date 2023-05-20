import connectToDb from '../../DB/config/connectToDb.js';
import {cartModel, userModel} from '../../DB/model/modelSchema.js';
import logger from '../../logger/logger.js';

class CartDao {
    
        async createCart(username, address) {
            try {
            await connectToDb();
            const cart = new cartModel({
                username: username,
                address: address,
                products: []
            });
            await cart.save();
            return cart;
            } catch (error) {
            throw new Error(`Error creating cart: ${error}`);
            }
        }
        
        async getCartByUsername(username) {
            try {
            await connectToDb();
            const cart = await cartModel.findOne({ username });
            if (cart) {
                return cart;
            } else {
                throw new Error(`Cart not found for username: ${username}`);
            }
            } catch (error) {
            throw new Error(`Error retrieving cart: ${error}`);
            }
        }
        
        async updateCart(cartId, updatedCartData) {
            try {
            await connectToDb();
            const cart = await cartModel.findByIdAndUpdate(
                cartId,
                { $addToSet: {products: updatedCartData} },
                { new: true }
            );
            if (cart) {
                return cart;
            } else {
                throw new Error(`Cart not found for ID: ${cartId}`);
            }
            } catch (error) {
            throw new Error(`Error updating cart: ${error}`);
            }
        }
        
        async deleteCart(cartId) {
            try {
            await connectToDb();
            const deletedCart = await cartModel.findByIdAndDelete(cartId);
            if (deletedCart) {
                return deletedCart;
            } else {
                throw new Error(`Cart not found for ID: ${cartId}`);
            }
            } catch (error) {
            throw new Error(`Error deleting cart: ${error}`);
            }
        }

        async deleteCartItem(cartId, itemName) {
        try {
        await connectToDb();
        const cart = await cartModel.findById(cartId);
        if (!cart) {
            throw new Error(`Carrito con ID "${cartId}" no encontrado`);
        }

        const updatedProducts = cart.products.filter(item => item.product !== itemName);
        cart.products = updatedProducts;
        await cart.save();

        return cart;
        } catch (error) {
        throw new Error(`Error al eliminar el item del carrito: ${error}`);
        }
    }


};

export const cartDao = new CartDao();