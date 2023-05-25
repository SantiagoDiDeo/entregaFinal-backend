import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import { compareSync, hashSync} from 'bcrypt';
import { getAllUsersController, createUserController, getUserControllerByUsername } from '../../controller/users.js';
import logger from '../../logger/logger.js';
import jwt from 'jsonwebtoken';
import { jwtKey } from '../../environments/env.js';


passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser( async (username, done) => {
    try {
        const existentUser = await getUserControllerByUsername(username);
        
        if (!existentUser) {
            done(new Error(`User with username ${username} does not exist`));
        } else {
            done(null, existentUser);
        }
        } catch (error) {
            logger.error(`Error: ${error} trying to deserialize user ${username}`);
        };
});

passport.use(
    'jwt',
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "entregafinal123456", 
        },
        async (payload, done) => {
            try {
            const user = await getUserControllerByUsername( payload.username );
            return done(null, user !== null ? user : false);
            } catch (error) {
            return done(error, false);
            };
        }
    )
);


passport.use('signup', new LocalStrategy(async (username, password, done) => {
    try {
        const existentUser = await getUserControllerByUsername(username);
        if (existentUser) {
            logger.info(`Se intento registrar un usuario ya existente`)
            return done( null, false )  
        } else {
            return done( null, { username: username } )
        }
        } catch (error) {
        logger.error(`Error in passport signup ${error}`);
        }
    }));


passport.use('login', new LocalStrategy(async (username, password, done) => {
    try {
        const existentUser = await getUserControllerByUsername(username);
        if (!existentUser) {
            return done(null, false, { message: 'Usuario no encontrado' });
        }
        
        const passwordMatch = compareSync(password, existentUser.password);
        if (!passwordMatch) {
            return done(null, false, { message: 'Contraseña incorrecta' });
        }
        
        return done(null, existentUser);
        } catch (error) {
        return done(error);
        }
    }));


export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['Authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) {
        return res.sendStatus(401);
    }
    jwt.verify(token, jwtKey, (err, user) => {
        if(err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    })
}

export const generateJwt = (username) => {
    const payload = {
        username: username
    }
    const options = {
        expiresIn: 3600
    }
    return jwt.sign(payload, jwtKey, options);
};
    

export default passport;