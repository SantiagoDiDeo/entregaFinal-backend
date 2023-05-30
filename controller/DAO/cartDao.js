import connectToDb from "../../DB/config/connectToDb.js";
import { cartModel } from "../../DB/model/modelSchema.js";
import logger from "../../logger/logger.js";

class CartDao {
  async createCart(username, address, products) {
    try {
      await connectToDb();
      products = [];
      const cart = new cartModel({
        username: username,
        address: address,
        products: products,
      });
      await cart.save();
      return cart;
    } catch (error) {
      logger.error(`${error} --Error al intentar crear carrito `);
    }
  }

  async getCartByUsername(username) {
    try {
      await connectToDb();
      const cart = await cartModel.findOne({ username: username });
      if (cart) {
        return cart;
      } else {
        logger.warn(`--Error: Carrito no encontrado con username: ${username}`);
      }
    } catch (error) {
      logger.error(`${error} --Error recuperando carrito`);
    }
  }

  async updateCart(cartId, updatedCartData) {
    try {
      await connectToDb();
      const cart = await cartModel.findByIdAndUpdate(
        cartId,
        { $addToSet: { products: updatedCartData } },
        { new: true }
      );
      if (cart) {
        return cart;
      } else {
        logger.warn(`--Carrito no encontrado con ID: ${cartId}`);
      }
    } catch (error) {
      logger.warn(`${error} --Error actualizando carrito`);
    }
  }

  async deleteCart(cartId) {
    try {
      await connectToDb();
      const deletedCart = await cartModel.findByIdAndDelete(cartId);
      if (deletedCart) {
        return deletedCart;
      } else {
        logger.warn(`--Error: carrito no encontrado con ID: ${cartId}`);
      }
    } catch (error) {
      logger.error(`${error} --Error al intentar borrar carrito`);
    }
  }

  async deleteCartItem(cartId, itemName) {
    try {
      await connectToDb();
      const cart = await cartModel.findById(cartId);
      if (!cart) {
        logger.warn(`--Carrito con ID "${cartId}" no encontrado`);
      }

      const updatedProducts = cart.products.filter(
        (item) => item.product !== itemName
      );
      cart.products = updatedProducts;
      await cart.save();

      return cart;
    } catch (error) {
      logger.error(`${error} --Error al eliminar el item del carrito`);
    }
  }
}

export const cartDao = new CartDao();
