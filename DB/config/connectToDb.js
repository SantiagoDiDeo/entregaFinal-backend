import express from 'express';
import {mongoUrl}  from '../../environments/env.js';
import logger from '../../logger/logger.js';
import mongoose from 'mongoose';
import {mongoDbPass} from '../../environments/env.js';

const app = express();

const connectMongo = async () => {
    try {
        await mongoose.connect(mongoUrl, {
            dbName: "ecommerce-final", 
            user: "santiagod", 
            pass: mongoDbPass, 
        });
        logger.info("--MongoDB conectado correctamente (connectMongo)");
    } catch (error) {
        logger.error(`${error} --Error mongoDB no conectado`);
    };
};

const connectToDb = async () => {
    let isConnected;
    
    if(!isConnected) {
        try {
            await connectMongo();
            isConnected = true;
            logger.info('--Base de datos conectada correctamente (connectToDb)');
            return;
        } catch (err) {
            logger.error(`${err} --Error al conectar base de datos. No conectada. (connectToDb)`);
        }
    };
};

export default connectToDb; 