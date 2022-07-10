const {
  getAllUsersService,
  getUserService,
  createUserService,
  updateUserService,
  deleteUserService,
} = require("../services/userServices");
const { MongooseNotFoundError } = require("../utils/Error");

const getAllUsers = async (req, res) => {
  try {
    const result = await getAllUsersService();
    res.json(result);
  } catch (e) {
    next(e);
  }
};

const getUser = async (req, res, next) => {
  try {
    const result = await getUserService(req.params.id);
    if (result == null)
      throw new MongooseNotFoundError("id or username", req.params.id);
    res.json(result);
  } catch (e) {
    next(e);
  }
};

const createUser = async (req, res, next) => {
  try {
    const result = await createUserService(req.body);
    console.log(result);
    res.json(result);
  } catch (e) {
    next(e);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const result = await updateUserService(req.params.id, req.body);
    console.log(result);
    res.json(result);
  } catch (e) {
    next(e);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const result = await deleteUserService(req.params.id);
    res.json(result);
  } catch (e) {
    next(e);
  }
};

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };
