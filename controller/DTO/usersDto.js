import {userDao}  from '../DAO/usersDao.js';
import logger from '../../logger/logger.js';

const mapUser = (user) => user ?
    ({
        username: user.username,
        password: user.password,
        email: user.email,
        address: user.address,
        age: user.age,
        phoneNumber: user.phoneNumber,
        avatar: user.avatar,
    }) : null;

const getUsersDto = async() => {
    try {
        const users = await userDao.getAllUsers();
        return users.map(user => mapUser(user));
    } catch (error) {
        logger.error(`${error} --Error al encontrar usuarios dto`);
        }
};

const getUserByUsernameDto = async(username) => {
    try {
        const returnedUser = await userDao.getUserByUsername(username);
        return mapUser(returnedUser);
    } catch (error) {
        logger.error(`${error} --Error al encontrar usuario dto: ${username}`);
    }
};

const createUserDto = async (user) => {
    try {
        const existingUser = await userDao.getUserByUsername(user.username);
        if (existingUser) {
            logger.warn(`--Usuario "${user.username}" ya existe`);
        }
    
        const newUser = await userDao.saveUser({
            ...user,
            createdAt: new Date().toLocaleString(),
        });    
        return newUser;
    } catch (error) {
        logger.error(`${error} --Error al crear usuario dto`);
    }
};

const deleteUserDto = async (id) => {
    try {
        const deletedUser = await userDao.deleteUser(id);
        return deletedUser;
    } catch (error) {
        logger.error(`${error} --Error al intentar eliminar usuario`);
    }
};

export  { getUsersDto, createUserDto, deleteUserDto, getUserByUsernameDto };