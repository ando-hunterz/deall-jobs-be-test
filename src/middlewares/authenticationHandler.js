const { UnauthorizedError } = require("../utils/Error");
const { checkTokenValid, getToken } = require("../utils/jwt");

module.exports = (req, res, next) => {
  const jwttoken = getToken(req.headers["authorization"]);
  checkTokenValid(jwttoken);
  next();
};
