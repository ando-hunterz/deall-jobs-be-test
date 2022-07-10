const { MongooseNotFoundError, UnauthorizedError } = require("../utils/Error");
const { getUserService } = require("../services/userServices");
const { checkPassword } = require("../utils/bcrypt");
const { createToken, checkRefreshTokenValid, createNewToken } = require("../utils/jwt");
const { getTokenService, deleteTokenService } = require("../services/tokenServices");

const userSignIn = async (req, res, next) => {
  try {
    const result = await getUserService(req.body.username);
    if (result == null)
      throw new MongooseNotFoundError("username", req.body.username);
    ({_id, username, password, role} = result)
    await checkPassword(req.body.password, password);
    res.send(await createToken(_id, username, role));
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const userRefresh = async (req, res, next) => {
    try{
      const token = await getTokenService(req.body.token)
      if(token == null) throw new UnauthorizedError("Token not present")
      const result = checkRefreshTokenValid(token.token)
      if(!result) throw new UnauthorizedError("Token Expired please relogin")
      res.send(createNewToken(token.token))
    } catch (e) {
      console.log(e)
      next(e)
    }
}

const userSignOut = async (req, res, next) => {
  try {
    const token = await getTokenService(req.body.token)
    if(token == null) throw new UnauthorizedError('User not logged')
    await deleteTokenService(token._id)
    res.json({"message": "user signed out"})
  } catch (e) {
    console.log(e)
    next(e)
  }
}

module.exports = {userSignIn, userSignOut, userRefresh}
