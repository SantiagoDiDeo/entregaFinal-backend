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
        cart: user.cart,
    }) : null;

const getUsersDto = async() => {
    const users = await userDao.getAllUsers({});
    return users.map(user => mapUser(user));
};

const getUserByUsernameDto = async(username) => {
    const returnedUser = await userDao.getUserByUsername(username);
    return mapUser(returnedUser);
};

const createUserDto = async (user) => {
    const newUser = await userDao.saveUser({
        ...user,
        createdAt: new Date().toLocaleString(),
        });
    return mapUser(newUser);
};

const deleteUserDto = async (id) => {
    const deletedUser = await userDao.deleteUser(id);
    return deletedUser;
};

export  { getUsersDto, createUserDto, deleteUserDto, getUserByUsernameDto };