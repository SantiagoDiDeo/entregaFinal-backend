import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
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
        logger.info("MongoDB connected successfully");
    } catch (error) {
        logger.error(`Error ${error} mongoDB not connected `);
    };
};

const connectToDb = async () => {
let isConnected;

if(!isConnected) {
    await connectMongo();
    app.use(session({
        store: new MongoStore({
            mongoUrl: mongoUrl}),
            secret: 'secreto1',
            cookie: {maxAge: 60000},  
            resave: true,
            saveUninitialized: true,
            serverSelectionTimeoutMS: 30000,
        }));
    isConnected = true;
    logger.info('Database Connected successfully');
    return;
    } else {   
        logger.info("Connection with DB already exists");
        return;
    };
};

export default connectToDb; 