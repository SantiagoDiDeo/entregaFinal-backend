import { expect, assert } from "chai";
import {
  createProductController,
  getProductByIdController,
  getProductByCategoryController,
  getAllProductsController,
  deleteProductByIdController,
  modifyProductByIdController,
} from "../controller/products.js";
import mongoose from "mongoose";

describe("product controller MONGODB", () => {
  // it('should return empty array if no product is added or an array of products', async () => {
  //         const result = await getAllProductsController();
  //         expect(result).to.be.an('array');
  // }).timeout(5000);
  // it('should return a product added', async () => {
  //         const productToAdd = {
  //         title: 'manzana',
  //         description: 'lorem ipsum dolor sit am',
  //         code: 1,
  //         price: 100,
  //         stock: 10,
  //         category: "fruta",
  //         thumbnail: 'fruit.jpg'
  //         };
  //         await createProductController(productToAdd);
  //         const result = await getAllProductsController();
  //         expect(result).to.be.an('array')
  // });
  // it('should return a product by id', async () => {
  //         const id = '6463b9958eb5675173d9116f';
  //         const expectedId = new mongoose.Types.ObjectId(id);
  //         const result = await getProductByIdController(id);
  //         expect(result._id).to.deep.equal(expectedId);
  // });
  // it('should return a product by id', async () => {
  //         const category = 'fruta';
  //         const result = await getProductByCategoryController(category);
  //         expect(result.category).to.deep.equal(category);
  // });
  // it('should modify product by id', async () => {
  //         const id = '6463b9958eb5675173d9116f';
  //         const originalProduct = await getProductByIdController(id);
  //         console.log("🚀 ~ file: product.controller.test.js:46 ~ it ~ originalProduct:", originalProduct)
  //         const modifyProduct = await modifyProductByIdController(originalProduct._id, {title: 'banana'});
  //         const modifiedProduct = await getProductByIdController(modifyProduct._id);
  //         console.log("🚀 ~ file: product.controller.test.js:56 ~ it ~ modifiedProduct:", modifiedProduct)
  //         expect(modifiedProduct.title).to.equal('banana');
  // });
  // it('should delete product by id', async () => {
  //         const id = '6463b9958eb5675173d9116f';
  //         const idObj = new mongoose.Types.ObjectId(id);
  //         const productsBeforeDeletion = await getAllProductsController();
  //         const result = await deleteProductByIdController(idObj);
  //         const productsAfterDeletion = await getAllProductsController();
  //         expect(productsBeforeDeletion.length).to.equal(productsAfterDeletion.length + 1);
  // });
});
