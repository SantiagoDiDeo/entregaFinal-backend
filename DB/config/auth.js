import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { compareSync, hashSync } from "bcrypt";
import {
  getAllUsersController,
  createUserController,
  getUserControllerByUsername,
} from "../../controller/users.js";
import logger from "../../logger/logger.js";
import jwt from "jsonwebtoken";
import { jwtKey } from "../../environments/env.js";

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (username, done) => {
  try {
    const users = await getAllUsersController();
    const existentUser = users.find((user) => user.username === username);

    if (!existentUser) {
      done(null, false, { message: ` usuario ${users.username} no existe` });
    } else {
      done(null, existentUser);
    }
  } catch (error) {
    logger.error(
      `${error} --Error intentando deserializar usuario ${users.username}`
    );
  }
});

passport.use(
  "signup",
  new LocalStrategy(async (username, password, done) => {
    try {
      let existentUser = await getUserControllerByUsername(username);
      if (existentUser) {
        logger.warn(`Se intento registrar un usuario ya existente`);
        return done(null, false);
      } else {
        const newUser = {
          username: username,
          password: password,
        };
        return done(null, newUser);
      }
    } catch (error) {
      logger.error(
        `${error} --Error al intentar autenticar usuario (passport signup)`
      );
    }
  })
);

passport.use(
  "login",
  new LocalStrategy(async (username, password, done) => {
    try {
      const existentUser = await getUserControllerByUsername(username);
      if (!existentUser) {
        return done(null, false, { message: "Usuario no encontrado" });
      }
      const passwordMatch = compareSync(password, existentUser.password);
      if (!passwordMatch) {
        return done(null, false, { message: "Contraseña incorrecta" });
      } else {
        return done(null, existentUser);
      }
    } catch (error) {
      return done(error, false, { message: "login no autorizado" });
    }
  })
);

passport.use(
  "jwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtKey,
    },
    async (username, done) => {
      try {
        const user = await getUserControllerByUsername(username);
        return done(null, user !== null ? user : false);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

export default passport;

export const generateJwt = (user) => {
  return jwt.sign(user, jwtKey, { expiresIn: "30m" });
};

export const authenticateToken = (req, res, next) => {};
