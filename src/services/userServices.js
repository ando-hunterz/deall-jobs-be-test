const {
  getUser,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  countAdmin,
} = require("../repository/users");
const mongoose = require("mongoose");
const { hashPassword } = require("../utils/bcrypt");
const {
  MongooseFoundError,
  MongooseNotFoundError,
  UnauthorizedError,
} = require("../utils/Error");

const getUserService = async (query) => {
  try {
    if (mongoose.Types.ObjectId.isValid(query)) {
      return await getUserById(query);
    } else {
      return await getUser(query);
    }
  } catch (e) {
    console.log(e);
    throw new Error(e.message);
  }
};

const getAllUsersService = async () => {
  try {
    return await getAllUsers();
  } catch (e) {
    console.log(e);
    throw new Error(e.message);
  }
};

const createUserService = async (body) => {
  try {
    body.password = await hashPassword(body.password);
    const userFound = await getUser(body.username);
    if (userFound != null) throw new MongooseFoundError("Username is taken");
    const result = await createUser(body);
    console.log(result);
    return result;
  } catch (e) {
    console.log(e);
    if (e instanceof MongooseFoundError)
      throw new MongooseFoundError(e.message);
    throw new Error(e.message);
  }
};

const updateUserService = async (id, body) => {
  try {
    console.log(id);
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Wrong paramter");
    if (body.password != undefined)
      body.password = await hashPassword(body.password);
    if (body.username) {
      const userFound = await getUser(body.username);
      if (userFound != null) throw new MongooseFoundError("Username is taken");
    }
    const result = await updateUser(id, body);
    if (result == null) throw new MongooseNotFoundError("id", id);
    return result;
  } catch (e) {
    console.log(e);
    if (e instanceof MongooseNotFoundError)
      throw new MongooseNotFoundError(e.field, e.value);
    if (e instanceof MongooseFoundError)
      throw new MongooseFoundError(e.message);
    throw new Error(e.message);
  }
};

const deleteUserService = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Wrong paramter");
    const result = await deleteUser(id);
    if (result == null) throw new MongooseNotFoundError("id", id);
    return result;
  } catch (e) {
    console.log(e);
    if (e instanceof MongooseNotFoundError)
      throw new MongooseNotFoundError(e.field, e.value);
    throw new Error(e.message);
  }
};

const countAdminService = async () => {
  try {
    return await countAdmin();
  } catch (e) {
    console.log(e);
    throw new Error(e.message);
  }
};

module.exports = {
  getUserService,
  getAllUsersService,
  createUserService,
  updateUserService,
  deleteUserService,
  countAdminService
};
