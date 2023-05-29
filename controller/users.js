import {
  getUsersDto,
  createUserDto,
  deleteUserDto,
  getUserByUsernameDto,
} from "../controller/DTO/usersDto.js";
import logger from "../logger/logger.js";

const getAllUsersController = async () => {
  try {
    const getUser = await getUsersDto({});
    if (getUser.length === 0) {
      return [];
    }
    return getUser;
  } catch (error) {
    logger.error(`${error} --Error al intentar encontrar usuarios controller`);
  }
};

const getUserControllerByUsername = async (username) => {
  try {
    const existentUser = await getUserByUsernameDto(username);
    return existentUser;
  } catch (error) {
    logger.error(
      `${error} --Error intentando encontrar usuario controller: ${username}`
    );
  }
};

const createUserController = async (user) => {
  try {
    const existingUser = await getUserControllerByUsername(user.username);

    if (existingUser) {
      logger.warn(`Usuario "${existingUser.username}" ya existe`);
      return false;
    }

    if (!user.username || !user.password || !user.email) {
      logger.warn("--Error: falta informacion en los campos");
    }
    return createUserDto(user);
  } catch (error) {
    logger.error(`${error} --Error al intentar crear usuario controller`);
  }
};

const deleteUserController = async (id) => {
  try {
    const deleteUser = await deleteUserDto(id);
    return deleteUser;
  } catch (error) {
    logger.error(
      `${error} --Error al intentar borrar usuario controller con id: ${id}`
    );
  }
};

export {
  createUserController,
  getAllUsersController,
  deleteUserController,
  getUserControllerByUsername,
};
