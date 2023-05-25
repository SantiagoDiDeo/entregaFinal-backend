import express from 'express';
import passport from '../DB/config/auth.js';
import multer from 'multer';
import '../DB/config/auth.js';
import {generateJwt} from '../DB/config/auth.js';
const { Router } = express;
const sessionRouter = Router();
import { getAllUsersController, createUserController, getUserControllerByUsername } from '../controller/users.js';
import logger from '../logger/logger.js';

sessionRouter.use(passport.initialize());
sessionRouter.use(passport.session());

sessionRouter.get('/', async (req, res) => {
    const users = await getAllUsersController()
    res.render('form.handlebars', {users: users});
});

sessionRouter.post('/signup', 
passport.authenticate('signup'),
    async (req, res) => {

    const existentUser = await getUserControllerByUsername(req.body.username);
    if (existentUser) {
        res.status(403).send('el usuario ya existe');
        return;
    }; 
    const user = req.body;
    await createUserController(user);

    req.session.username = req.body.username;

    res.redirect('/products');
});

sessionRouter.post('/login',
  passport.authenticate('login'),
  async (req, res) => {
    const { username, password } = req.body;

    const existentUser = await getUserControllerByUsername(username);

    if (!existentUser || !compareSync(password, existentUser.password)) {
      res.status(403).send('el usuario no existe o es incorrecto');
      return;
    }

    req.session.username = existentUser.username;
    res.redirect('/products');
  }
);


 sessionRouter.get('/logout',  (req,res) => {
     req.session.destroy(  () => {
      res.send(`Hasta luego ${req.session.username}`);
   });
   res.redirect('/');
});



export default sessionRouter;