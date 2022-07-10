const { UnauthorizedError } = require("../utils/Error");
const { getToken, decodeToken, checkCurrentUser } = require("../utils/jwt");

module.exports = (req, res, next) => {
  const jwttoken = getToken(req.headers["authorization"]);
  if (checkCurrentUser(jwttoken)) next();
  else {
    const { id, username } = decodeToken(jwttoken);
    if (id != req.params.id && username != req.params.id)
      throw new UnauthorizedError();
    next();
  }
};
