// import { expect, assert } from 'chai';
// import {
//     createCartController,
//     getCartByUsernameController,
//     updateCartController,
//     deleteCartController,
//     deleteCartItemController
// } from '../controller/carts.js';

// import {newOrderController} from '../controller/orders.js';
// import {getAllProductsController} from '../controller/products.js';
// import {newOrderDto} from '../controller/DTO/orderDto.js';

// describe('newOrderController', () => {
//     it('debería retornar false si el carrito está vacío', async () => {
//       // Arrange
//         const emptyCart = { products: [] };
//         const getCartByUsernameController = async () => emptyCart;

//         // Act
//         const result = await newOrderController('nombre-de-usuario');

//         // Assert
//         expect(result).to.be.false;
//         });

//         it('debería retornar true si el pedido y la eliminación del carrito son exitosos', async () => {
//         // Arrange
//         const cart = { products: [{ id: 1 }, { id: 2 }] };
//         const getCartByUsernameController = async () => cart;
//         const getAllProductsController = async () => [{ id: 1, price: 10, title: 'Producto 1' }, { id: 2, price: 20, title: 'Producto 2' }];
//         const newOrderDto = async () => true;
//         const handleSendEmail = () => {};

//         // Act
//         const result = await newOrderController('nombre-de-usuario');

//         // Assert
//         expect(result).to.be.true;
//         });
//     });

//  describe('Cart Controller', () => {
//     describe('createCartController', () => {
//         it('should create a new cart', async () => {
//             const newCartData = {
//             username: 'testuser1',
//             products: [{}],
//             address: 'Test Address1'
//             };

//             const newCart = await createCartController(newCartData.username, newCartData.address);
//             console.log("🚀 ~ file: cart.controller.test.js:13 ~ it ~ newCart:", newCart)

//             expect(newCart).to.be.an('object');
//             // Add further assertions if needed
//         }).timeout(5000);
//         });

//         describe('getCartByUsernameController', () => {
//         it('should get a cart by username', async () => {
//             const username = 'testuser';

//             const cart = await getCartByUsernameController(username);
//             console.log("🚀 ~ file: cart.controller.test.js:24 ~ it ~ cart:", cart)

//             expect(cart).to.be.an('object');
//             // Add further assertions if needed
//         });
//         });

//         describe('updateCartController', () => {
//         it('should update a cart', async () => {
//             const cartId = '646522c4630b459241fc2a20'; // Provide a valid cart ID
//             const updatedCartData = {
//                 product: "orange",
//                 quantity: 200,
//                 itemId: 111
//             // Provide the updated data for the cart
//             };

//             const updatedCart = await updateCartController(cartId, updatedCartData);
//             console.log("🚀 ~ file: cart.controller.test.js:50 ~ it ~ updatedCart:", updatedCart)

//             expect(updatedCart).to.be.an('object');
//             // Add further assertions if needed
//         });
//         });

//         describe('deleteCartController', () => {
//         it('should delete a cart', async () => {
//             const cartId = '6465233a71ce51f85a16f174'; // Provide a valid cart ID

//             const deletedCart = await deleteCartController(cartId);

//             expect(deletedCart).to.be.an('object');
//             // Add further assertions if needed
//         }).timeout(5000);
//         });

//         describe('deleteCartItemController', () => {
//         it('should delete a cart item', async () => {
//             const cartId = '646522c4630b459241fc2a20'; // Provide a valid cart ID
//             const itemName = 'orange'; // Provide a valid item ID

//             const updatedCart = await deleteCartItemController(cartId, itemName);
// 'orange'
//             expect(updatedCart).to.be.an('object');
//             // Add further assertions if needed
//         });
//         });
// });
