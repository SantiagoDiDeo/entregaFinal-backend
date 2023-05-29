import {
  getAllProductsDto,
  getProductsByIdDto,
  getProductByCategoryDto,
  deleteAllProductsDto,
  addProductDto,
  deleteProductByIdDto,
  modifyProductByIdDto,
} from "../controller/DTO/productsDto.js";
import logger from "../logger/logger.js";

const imageUrl = (url) => {
  const ext = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
  return ext.test(url);
};

const getProductsRouter = async (req, res, route, id) => {
  try {
    const list = route === "productsList";
    if (id) {
      const products = await getProductsByIdDto(id);
      res.render(route, { products });
      return;
    }
    const products = await getAllProductsDto();
    res.render(route, { products, list });
  } catch (error) {
    console.log(`${error} --Error (getProductsRouter) al traer productos`);
  }
};

const getAllProductsController = async () => {
  const getProducts = (await getAllProductsDto({})) || [];
  return getProducts;
};

const getProductByIdController = async (id) => {
  const productById = await getProductsByIdDto(id);
  return productById;
};

const getProductByCategoryController = async (category) => {
  const product = await getProductByCategoryDto(category);
  return product;
};

const createProductController = async (productToAdd) => {
  const existentProduct = await getProductByIdController(productToAdd.id);

  return existentProduct
    ? logger.warn(`Product "${productToAdd.title}" already exists`)
    : addProductDto(productToAdd);
};

const modifyProductByIdController = async (id, productToUpdate) => {
  try {
    const updatedProduct = await modifyProductByIdDto(id, productToUpdate);
    return updatedProduct ? updatedProduct : false;
  } catch (error) {
    logger.error(
      `${error} --Error al intentar modificar producto controller id: ${id}`
    );
  }
};

const deleteProductByIdController = async (id) => {
  try {
    const deletedProduct = await deleteProductByIdDto(id);
    return deletedProduct ? deletedProduct : false;
  } catch (error) {
    logger.error(
      `${error} --Error al intentar borrar producto controller con id: ${id}`
    );
  }
};

const deleteAllProductsController = async () => {
  //commented for security reasons.
  //   await deleteAllProductsDto();
  //   return;
};

export {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  getProductByCategoryController,
  modifyProductByIdController,
  deleteAllProductsController,
  deleteProductByIdController,
  getProductsRouter,
};
