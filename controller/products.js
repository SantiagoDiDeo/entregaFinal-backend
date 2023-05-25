import { getAllProductsDto, getProductsByIdDto, getProductByCategoryDto, deleteAllProductsDto, addProductDto, deleteProductByIdDto, modifyProductByIdDto } from '../controller/DTO/productsDto.js';
import logger from '../logger/logger.js'

const imageUrl = ( url ) => {
    const ext = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    return ext.test( url );
};

const getAllProductsController = async() => {
    const getProducts = await getAllProductsDto({});
    if (getProducts.length === 0) {
        return [];
    };
    return getProducts;
};

const getProductByIdController = async( id ) => {
    const productById = await getProductsByIdDto( id );
    return productById;
};

const getProductByCategoryController = async (category) => {
    const product = await getProductByCategoryDto(category);
    return product;
}

const createProductController = async ( productToAdd ) => {
        const existentProduct = await getProductByIdController(productToAdd.id)

        return existentProduct
        ? logger.error(`Product "${productToAdd.title}" already exists`)
        : addProductDto(productToAdd);
};

const modifyProductByIdController = async (id, productToUpdate) => {
    try {
        const updatedProduct = await modifyProductByIdDto(id, productToUpdate);
        return updatedProduct ? updatedProduct : false;
    } catch (error) {
        logger.error(`Error: "${error}" when modifying product`);
        throw error;
    }
};

const deleteProductByIdController = async (id) => {
    try {
    const deletedProduct = await deleteProductByIdDto(id);
    return {
        success: true,
        message: `Product with id ${id} was deleted`,
        data: deletedProduct
        };
    } catch (error) {
    return {
        success: false,
        message: `Error deleting product with id ${id}`,
        error: error.message
        };
    };
};


const deleteAllProductsController = async() => {
//commented for security reasons.
//   await deleteAllProductsDto();
//   return;
};


export  { createProductController, getAllProductsController, getProductByIdController, getProductByCategoryController, modifyProductByIdController, deleteAllProductsController, deleteProductByIdController };