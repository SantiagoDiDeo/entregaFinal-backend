import express from 'express';
import passport from '../DB/config/auth.js';
import multer from 'multer';
import '../DB/config/auth.js';
import {PORT, emailUser, mongoUrl, userSessionTime} from '../environments/env.js';
import {generateJwt} from '../DB/config/auth.js';
const { Router } = express;
const sessionRouter = Router();
import { getAllUsersController, createUserController, getUserControllerByUsername } from '../controller/users.js';
import logger from '../logger/logger.js';

sessionRouter.use(passport.initialize());
sessionRouter.use(passport.session());

sessionRouter.get('/', async (req, res) => {
    try {
      const users = await getAllUsersController()
      res.render('register.handlebars', {users: users});
    } catch (error) {
      logger.error(`${error} --Error al intentar renderizar ruta de usuarios`);
    }
});

sessionRouter.post('/signup', 
passport.authenticate('signup', {failureRedirect: '/'}),
    async (req, res) => {
      const existentUser = await getUserControllerByUsername(req.body.username);
      if (existentUser) {
          res.status(403).send('el usuario ya existe');
          return;
      }; 
      const user = req.body;
      await createUserController(user);

      req.session.passport.user = user;
      res.redirect('/products');
});

sessionRouter.post('/login',
  passport.authenticate('login'),
  async (req, res) => {
    let userData = req.body;
    const existentUser = await getUserControllerByUsername(userData.username);
    if (!existentUser) {
      res.status(403).send('el usuario no existe');
      return;
    } else {
      req.session.passport.user = existentUser;
      const token = generateJwt(existentUser);
      req.session.save()
      res.header('authorization', token).redirect('/products')
    }
  }
);

sessionRouter.get('/info', async (_, res) => {
  res.render('info', 
    {
      port: PORT,
      url: mongoUrl.split('@')[1].split('?')[0],
      email: emailUser,
      time: userSessionTime,
      }
  );
});

export default sessionRouter;