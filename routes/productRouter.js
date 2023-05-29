import express, { response } from 'express';
const { Router } = express;
import { createProductController, getAllProductsController, getProductByIdController, deleteProductByIdController, getProductsRouter, getProductByCategoryController, modifyProductByIdController } from '../controller/products.js';
import passport from '../DB/config/auth.js';
import '../DB/config/auth.js';
import logger from '../logger/logger.js';
import { createCartController } from '../controller/carts.js';

const productRouter = Router();

productRouter.use(passport.initialize());
productRouter.use(passport.session());

productRouter.get('/', async ( req, res) => {
    try {
        const products = await getAllProductsController();
        res.render('productsList', {products})
    } catch ( err ) {
        logger.error(`${err} --Error al intentar renderizar lista de productos route`);
    };
});

productRouter.post('/', async (req, res) => {
    try {
        let data = await req.body;
        const username = 'juancarlos1'; //aca va req.session.passport.user.username
        const address = 'casa'; //aca va req.session.passport.user.address

        let newData = {
            username: username,
            products: data.products,
            address: address
        };
        const newCart = await createCartController(newData.username, newData.address);
        if(newCart) {
            logger.warn(`carrito ${newCart} creado exitosamete`)
            res.status(200).send('Carrito creado exitosamente');
        }
    } catch (err) {
        logger.error(`${err} --Error al intentar hacer post de productos route`);
    };
});

productRouter.get('/admin', async ( req, res) => {
    try {
        const { id } = req.params
        await getProductsRouter(req, res, 'productsAdmin', id)
        res.status(200)
    } catch ( err ) {
        logger.error(`${err} --Error al intentar renderizar ruta de product-admin`)
    };
});

productRouter.get('/:id', async ( req, res ) => {
    try {
        const { id } = req.params
        await getProductsRouter(req, res, 'productsList', id)
        res.status(200)
    } catch ( err ) {
        logger.error(`${err} --Error al intentar renderizar productos por id route`);
    };
});

productRouter.get('/category/:category', async (req, res) => {
    try {
        const category = req.params.category;
        const products = await getProductByCategoryController(category);
        res.render('productsList', {products})
    } catch (error) {
        logger.error(`${error} --Error al intentar renderizar productos por categoria`);
    };
});

productRouter.post('/admin', async (req, res) => {
    try {
        const productToAdd = await req.body;
        await createProductController(productToAdd);
        res.redirect('/products');
    } catch (error) {
        logger.error(`${error} --Error al intentar hacer post de producto añadido`);
    };
});

productRouter.put('/:id', async ( req, res ) => {
    try {
        const id = req.params.id;
        const  replace  = req.body;
    
        if(await modifyProductByIdController( id, replace )){
            res.send({ message: 'producto modificado', product: replace});
            } else {
            res.status(404).send({ error: 'producto no encontrado'});
            };
    } catch (error) {
        logger.error(`${error} --Error al intentar modificar producto en ruta put`);
    };
});

productRouter.delete('/:id', async ( req, res ) => {
    try {
        const { id } = req.params;
        
        if (await deleteProductByIdController(id)) {
            res.send({ message: 'producto borrado'});
            } else {
            res.status(404).send({ error: 'producto no encontrado'});
        };
    } catch (error) {
        logger.error(`${error} --Error al intentar borrar producto en route`);
    };
});

export default productRouter;