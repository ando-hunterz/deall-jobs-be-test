const { countAdminService } = require("../services/userServices");
const { UnauthorizedError } = require("../utils/Error");
const { getToken, decodeToken } = require("../utils/jwt");

module.exports = async (req, res, next) => {
  const jwttoken = getToken(req.headers["authorization"]);
  const { id } = decodeToken(jwttoken);
  console.log(id);
  console.log(id == req.params.id);
  if (req.method != "PATCH" && req.method != "PUT" && id == req.params.id) {
    res
      .status(401)
      .json({ statusCode: 401, message: "Cannot Modify/Delete Admin" });
    return;
  }
  if (
    (await countAdminService()) <= 1 &&
    id == req.params.id &&
    req.body.role != null &&
    req.body.role == "user"
  ) {
    res
      .status(401)
      .json({ statusCode: 401, message: "Cannot Modify/Delete Admin" });
    return;
  }
  next();
};
