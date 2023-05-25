import express from 'express';
const { Router } = express;
import { createProductController, getAllProductsController, getProductByIdController, deleteProductByIdController } from '../controller/products.js';
import passport from '../DB/config/auth.js';
import '../DB/config/auth.js';
import logger from '../logger/logger.js';

const productRouter = Router();

productRouter.use(passport.initialize());
productRouter.use(passport.session());

productRouter.get('/', async ( req, res, route, id ) => {
    try {
        const user = req.session.passport.user;
        const list = route === 'products' ? true : false
        if(id) {
            const product = await getProductByIdController(id);
            res.render(route, {product})
            return;
        }
        const products = await getAllProductsController();
        console.log("🚀 ~ file: productRouter.js:23 ~ productRouter.get ~ products:", products)
        res.render(route, {products, user, list});
    } catch ( err ) {
        throw new Error(err);
    };

});

//get products by id
productRouter.get('/:id?', async ( req, res ) => {
    const id = req.params.id;
    const product = await getProductByIdController(id);
    product ? res.render( JSON.stringify(product, null, 2) )
    : res.status(404).send({ error: 'producto no encontrado'})  ;

});

//post product
productRouter.post('/', async (req, res) => {
    const productToAdd = await req.body;
    await createProductController(productToAdd);
    res.send({ message: 'producto agregado', product: productToAdd});
});

//update product
productRouter.put('/:id', async ( req, res ) => {
    const id = req.params.id;
    const  replace  = req.body;

    if(await createProductController( id )){
        res.send({ message: 'producto modificado', product: replace});
        } else {
        res.status(404).send({ error: 'producto no encontrado'});
        };
    
});

//delete product
productRouter.delete('/:id', async ( req, res ) => {
    const { id } = req.params;

    if (await deleteProductByIdController(id)) {
        res.send({ message: 'producto borrado'});
        } else {
        res.status(404).send({ error: 'producto no encontrado'});
        };
});

export default productRouter;