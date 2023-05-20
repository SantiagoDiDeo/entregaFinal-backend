import connectToDb from '../../DB/config/connectToDb.js';
import { productModel } from '../../DB/model/modelSchema.js';

class ProductDao {
    ID_FIELD = '_id';

    saveProduct = async (productToAdd) => {
        await connectToDb();        
        const product = new productModel(productToAdd);
        await product.save();
        return product;
    };

    getAllProducts = async () => {
        await connectToDb();
        const allProducts = await productModel.find({});
        return allProducts;
    };

    getProductById = async (id) => {
        await connectToDb();    
        const productById = await productModel.findOne({ _id: id });
        return productById;
    };

    getProductByCategory = async (category) => {
        await connectToDb();
        const productByCategory = await productModel.findOne({category: category});
        return productByCategory;
    };

    modifyProductById = async (id, item) => {
        await connectToDb();
        const productToUpdate = await productModel.findByIdAndUpdate(id, item, { new: true });
        return productToUpdate ? productToUpdate : false;
    };

    deleteProduct = async (id) => {
        await connectToDb();
        const deletedProduct = await productModel.deleteOne(id);
        return deletedProduct; 
    };

    deleteAllProducts = async ()=> {return await productModel.deleteMany()};
};

export const productDao = new ProductDao();