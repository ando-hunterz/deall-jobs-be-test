const bcrypt = require("bcrypt");
const { InvalidValueError } = require("./Error");

const checkPassword = async (plainPassword, hash) => {
  const result = await bcrypt.compare(plainPassword, hash);
  if (!result) throw new InvalidValueError("password");
  return result;
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

module.exports = { checkPassword, hashPassword };