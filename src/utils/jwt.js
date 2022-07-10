const jwt = require("jsonwebtoken");

const { jwtsalt, jwtrefreshsalt } = require("../config");
const { createTokenService } = require("../services/tokenServices");
const { UnauthorizedError } = require("../utils/Error");

const getToken = (headers) => {
  const token = headers;
  if (typeof token == "undefined")
    throw new UnauthorizedError("No Jwt Token Found");
  const jwttoken = token.split(" ")[1];
  return jwttoken;
};

const createToken = async (id, username, role) => {
  const token = jwt.sign({ id: id, username: username, role: role }, jwtsalt, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(
    { id: id, username: username, role: role },
    jwtrefreshsalt,
    {
      expiresIn: "7d",
    }
  );
  await createTokenService(refreshToken)
  return { token: token, refreshToken: refreshToken };
};

const createNewToken = (token) => {
  console.log(token)
  const { id, username, role } = jwt.verify(token, jwtrefreshsalt);
  const newToken = jwt.sign({ id: id, username: username, role: role }, jwtsalt, {
    expiresIn: "15m",
  });
  return { token: newToken };
};

const checkTokenValid = (token) => {
  try {
    jwt.verify(token, jwtsalt);
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      throw new UnauthorizedError("JWT Token Expired");
    }
    throw new UnauthorizedError();
  }
};

const checkRefreshTokenValid = (token) => {
  try {
    jwt.verify(token, jwtrefreshsalt);
    return true;
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return false;
    }
  }
};

const checkAdminToken = (token) => {
  try {
    const { role } = jwt.verify(token, jwtsalt);
    if (role !== "admin") throw new Error();
  } catch (err) {
    throw new UnauthorizedError("Not Admin");
  }
};

const checkCurrentUser = (token) => {
  try {
    const { role } = jwt.verify(token, jwtsalt);
    return role !== "admin" ? false : true;
  } catch (err) {
    throw new Error(err.message);
  }
};

const decodeToken = (token) => {
  try {
    const result = jwt.verify(token, jwtsalt);
    return result;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createToken,
  checkTokenValid,
  checkAdminToken,
  getToken,
  decodeToken,
  checkCurrentUser,
  checkRefreshTokenValid,
  createNewToken
};
