const Token = require("../models/token");

const getToken = async (query) => {
  try {
    return await Token.findOne({ token: query }).exec()
  } catch (e) {
    console.log(e);
    throw new Error(e.message);
  }
};

const createToken = async (body) => {
    try {
      return await Token.create(body);
    } catch (e) {
      console.log(e);
      throw new Error(e.message);
    }
};

const deleteToken = async (id) => {
  try {
    return await Token.findByIdAndDelete(id);
  } catch (e) {
    console.log(e);
    throw new Error(e.message);
  }
};

module.exports = {getToken, deleteToken, createToken}
