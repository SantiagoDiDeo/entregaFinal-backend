import connectToDb from "../../DB/config/connectToDb.js";
import { productModel } from "../../DB/model/modelSchema.js";
import logger from "../../logger/logger.js";

class ProductDao {
  ID_FIELD = "_id";

  saveProduct = async (productToAdd) => {
    try {
      await connectToDb();
      const product = new productModel(productToAdd);
      await product.save();
      return product;
    } catch (err) {
      logger.error(
        `${err} --Error al intentar guardar producto: ${productToAdd}`
      );
    }
  };

  getAllProducts = async () => {
    try {
      await connectToDb();
      const allProducts = await productModel.find({});
      return allProducts;
    } catch (err) {
      logger.error(`${err} --Error al intentar encontrar productos en db`);
    }
  };

  getProductById = async (id) => {
    try {
      await connectToDb();
      const productById = await productModel.findOne({ _id: id });
      return productById;
    } catch (err) {
      logger.error(
        `${err} --Error al intentar encontrar producto con id ${id}`
      );
    }
  };

  getProductByCategory = async (category) => {
    try {
      await connectToDb();
      const productByCategory = await productModel.find({ category: category });
      return productByCategory;
    } catch (err) {
      logger.error(
        `${err} --Error al intentar encontrar producto con categoria ${category}`
      );
    }
  };

  modifyProductById = async (id, item) => {
    try {
      await connectToDb();
      const productToUpdate = await productModel.findByIdAndUpdate(id, item, {
        new: true,
      });
      return productToUpdate ? productToUpdate : false;
    } catch (err) {
      logger.error(
        `${err} --Error al intentar modificar producto con id ${id}`
      );
    }
  };

  deleteProduct = async (id) => {
    try {
      await connectToDb();
      const deletedProduct = await productModel.deleteOne(id);
      return deletedProduct;
    } catch (err) {
      logger.error(`${err} --Error al intentar eliminar producto con id ${id}`);
    }
  };

  deleteAllProducts = async () => {
    //comentado por seguridad
    // return await productModel.deleteMany();
  };
}

export const productDao = new ProductDao();
