import express from 'express';
import { engine } from 'express-handlebars';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
import path from 'path';
import sessionRouter from '../routes/sessionRouter.js';
import productRouter from '../routes/productRouter.js';
import * as url from 'url';

const app = express();

const __dirname = url.fileURLToPath(new URL('..', import.meta.url));

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'secreto1', resave: true, saveUninitialized: true }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.set('views', path.join(__dirname, 'views', 'partials'));
app.set('view engine', 'handlebars');
app.engine('handlebars', engine({
    extname: '.hbs',
    defaultLayout: 'main.handlebars',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials')
}));

app.use('/', sessionRouter);
app.use('/products', productRouter);
// app.use('/info', infoRouter);

export default app;