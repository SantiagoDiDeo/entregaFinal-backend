import { hashSync } from "bcrypt";
import connectToDb from "../../DB/config/connectToDb.js";
import { userModel } from "../../DB/model/modelSchema.js";

class UserDao {
  saveUser = async (user) => {
    try {
      await connectToDb();
      const newUser = new userModel(user);
      newUser.password = hashSync(user.password, 10);
      await newUser.save();
      return newUser;
    } catch (err) {
      logger.error(
        `${err} --Error al intentar guardar ususario : ${user.username}`
      );
    }
  };

  getAllUsers = async () => {
    try {
      await connectToDb();
      const allUsers = await userModel.find({});
      return allUsers;
    } catch (err) {
      logger.error(`${err} --Error al intentar encontrar productos`);
    }
  };

  getUserByUsername = async (username) => {
    try {
      await connectToDb();
      const user = await userModel.findOne({ username: username });
      return user;
    } catch (err) {
      logger.error(`${err} --Error al intentar encontrar usuario con id ${id}`);
    }
  };

  deleteUser = async (id) => {
    try {
      await connectToDb();
      const deletedUser = await userModel.deleteOne(id);
      return deletedUser;
    } catch (err) {
      logger.error(`${err} --Error al intentar eliminar usuario con id ${id}`);
    }
  };
}

export const userDao = new UserDao();
