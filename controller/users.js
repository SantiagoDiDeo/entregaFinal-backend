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
    try {
        const existentUser = await getUserByUsernameDto(username);
        return existentUser;
    } catch (error) {
        throw new Error(`error getting user ${username}`);
    }
};

const createUserController = async (user) => {
    try {
        const existingUser = await getUserControllerByUsername(user.username);
    
        if (existingUser) {
            return { error: `User "${existingUser.username}" already exists` };
        }
    
        if (!user.username || !user.password || !user.email) {
            return { error: 'Missing data' };
        }
    
        return createUserDto(user);
        } catch (error) {
        throw error;
        }
};

const deleteUserController = async (id) => {
    try {
        const deleteUser = await deleteUserDto(id);
        return deleteUser;
        
    } catch (error) {
        throw new Error(`failed to delete user ${id}`);
    }
};

export  { createUserController, getAllUsersController, deleteUserController, getUserControllerByUsername };