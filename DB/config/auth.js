import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import { compareSync, hashSync} from 'bcrypt';
import { getAllUsersController, createUserController, getUserControllerByUsername } from '../../controller/users.js';
import logger from '../../logger/logger.js';


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

passport.use('login', new LocalStrategy(async (username, password, done) => {
    try {
        const users = await getAllUsersController();
        const user = users.find(user => user.username === username);
        if (!user) {
            logger.info(`(User ${username} not found)`);
            return done(null, false, { message: 'User not found' });
        }
        if (compareSync(password, user.password)) {
            return done(null, { username: username });
        } else {
            logger.info(`(User ${username} authentication failed)`);
            return done(null, false, { message: 'Authentication failed' });
        }
    } catch (error) {
        done(error);
    }
}));


passport.use('signup', new LocalStrategy(async (username, password, done) => {
    try {
        const existentUser = await getUserControllerByUsername(username);
        if (existentUser) {
            return done(new Error('User already exists'));
        } else {
            const user = { username, password: hashSync(password, 10) };
            const newUser = await createUserController(user);
            return done(null, newUser);
        }
        } catch (error) {
            logger.error(`Error ${error} trying to create user`);
        }
}));