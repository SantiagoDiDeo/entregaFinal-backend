import { getUsersDto, createUserDto, deleteUserDto, getUserByUsernameDto} from '../controller/DTO/usersDto.js';
import logger from '../logger/logger.js';

const getAllUsersController = async() => {
    const getUser = await getUsersDto( {} );
    if (getUser.length === 0) {
        return [];
    };
    return getUser;
};

const getUserControllerByUsername = async (username) => {
    const existentUser = await getUserByUsernameDto(username);
    return existentUser;
};

const createUserController = async (user) => {
    const existingUser = await getUserControllerByUsername(user.username);

    return existingUser
        ? Promise.reject(logger.error(`User "${user.username}" already exists`))
        : user.username && user.password && user.email
        ? createUserDto(user)
        : Promise.reject(logger.error(`Missing data`));
};

const deleteUserController = async (id) => {
    const deleteUser = await deleteUserDto(id);
    return deleteUser;
};

export  { createUserController, getAllUsersController, deleteUserController, getUserControllerByUsername };