import { handleSendEmail } from "../helpers/sendEmail.js";
import { getOrderByUsernameDto, newOrderDto } from "./DTO/orderDto.js";
import { getCartByUsernameController } from "./carts.js";
import { getAllProductsController } from "./products.js";
import { emailUser } from "../environments/env.js";
import { getUserControllerByUsername } from "./users.js";

export const getOrderByUsernameController = async (username) => {
  const order = await getOrderByUsernameDto(username);
  return order;
};

export const newOrderController = async (username) => {
  try {
    const cart = await getCartByUsernameController(username);
    // if ( cart.products.length === 0 ) return false;

    const products = await getAllProductsController();
    const orderArray = cart.products.map((cartItem) => {
      const productsDetail = products.find(
        (product) => product.id === cartItem.id
      );
      return {
        ...cartItem,
        price: productsDetail.price,
        title: productsDetail.title,
      };
    });

    const order = {
      username: username,
      address: cart.address,
      products: orderArray,
    };
    const user = await getUserControllerByUsername(username);
    const orderResult = await newOrderDto(order);
    const text = `tu orden fue creada: ${JSON.stringify(orderResult, null, 2)}`;
    const subject = `nuevo pedido de : ${username}`;
    handleSendEmail(text, subject, user.email);
  } catch (err) {
    logger.error(
      `${err} --Error al intentar crear nueva orden con id ${user._id}`
    );
  }
};
