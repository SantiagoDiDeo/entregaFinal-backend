import {userDao}  from '../DAO/usersDao.js';

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
        throw new Error(`Failed to get usersDto: ${error}`);
        }
};

const getUserByUsernameDto = async(username) => {
    try {
        const returnedUser = await userDao.getUserByUsername(username);
        return mapUser(returnedUser);
    } catch (error) {
        throw new Error(`Failed to get user by usernameDto: ${error}`);
    }
};

const createUserDto = async (user) => {
    try {
        const existingUser = await userDao.getUserByUsername(user.username);
        if (existingUser) {
            throw new Error(`User "${user.username}" already exists`);
        }
    
        const newUser = await userDao.saveUser({
            ...user,
            createdAt: new Date().toLocaleString(),
        });
    
        return mapUser(newUser);
    } catch (error) {
        throw new Error(`Failed to create userDto: ${error}`);
    }
};

const deleteUserDto = async (id) => {
    try {
        const deletedUser = await userDao.deleteUser(id);
        return deletedUser;
    } catch (error) {
        throw new Error(`failed to delete userDto: ${error}`);
    }
};

export  { getUsersDto, createUserDto, deleteUserDto, getUserByUsernameDto };