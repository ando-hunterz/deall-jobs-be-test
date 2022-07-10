const Users = require("../models/users");

const getUser = async (query) => {
  try {
    return (result = await Users.findOne({ username: query }).exec());
  } catch (e) {
    console.log(e);
    throw new Error(e.message);
  }
};

const getUserById = async (query) => {
  try {
    return (result = await Users.findById(query).exec());
  } catch (e) {
    console.log(e);
    throw new Error(e.message);
  }
};

const getAllUsers = async () => {
  try {
    return await Users.find().exec();
  } catch (e) {
    console.log(e);
    throw new Error(e.message);
  }
};

const createUser = async (body) => {
  try {
    return await Users.create(body);
  } catch (e) {
    console.log(e);
    throw new Error(e.message);
  }
};

const updateUser = async (id, body) => {
  try {
    return await Users.findByIdAndUpdate(id, body, { returnDocument: "after" });
  } catch (e) {
    console.log(e);
    throw new Error(e.message);
  }
};

const deleteUser = async (id) => {
  try {
    return await Users.findByIdAndDelete(id);
  } catch (e) {
    console.log(e);
    throw new Error(e.message);
  }
};

const countAdmin = async () => {
  try{
    return await Users.countDocuments({role: 'admin'})
  } catch (e) {
    console.log(e)
    throw new Error(e.message)
  }
}

module.exports = { getUser, getAllUsers, getUserById, createUser, updateUser, deleteUser, countAdmin };
