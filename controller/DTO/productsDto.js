import mongoose from 'mongoose';
import { productDao } from '../DAO/productsDao.js';

const mapProduct = (product) => product ?
({
    _id: product.id,
    timestamp: product.timestamp,
    title: product.title,
    description: product.description,
    code: product.code,
    price: product.price,
    stock: product.stock,
    thumbnail: product.thumbnail,
}) : null;

const getAllProductsDto = async() => {
    const allProducts = await productDao.getAllProducts({});
    return allProducts.map(product => mapProduct(product));
};

const addProductDto = async (productToAdd) => {
    const newProduct = await productDao.saveProduct({
        ...productToAdd,
        createdAt: new Date().toLocaleString(),
    });
    return mapProduct(newProduct);
    };

const getProductsByIdDto = async(id) => {
    if (mongoose.Types.ObjectId.isValid(id)) {
        id = id.toString();
    };
    const getProductById = await productDao.getProductById(id);
    return getProductById;
};

const getProductByCategoryDto = async (category) => {
    const product = await productDao.getProductByCategory(category);
    return product;
};

const modifyProductByIdDto = async (id, productToUpdate) => {
    const updatedProduct = await productDao.modifyProductById(id, productToUpdate);
    return mapProduct(updatedProduct);
};

const deleteProductByIdDto = async (id) => {
    const deleteProduct = await productDao.deleteProduct(id);
    return mapProduct(deleteProduct);
};

const deleteAllProductsDto = async() => {
    await productDao.deleteAllProducts();
    return;
};

export  {getAllProductsDto, getProductsByIdDto, getProductByCategoryDto, modifyProductByIdDto , deleteProductByIdDto ,deleteAllProductsDto, addProductDto};
