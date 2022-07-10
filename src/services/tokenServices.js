const { getToken, deleteToken, createToken } = require("../repository/token")

const getTokenService = async (query) => {
    try {
        return await getToken(query)
    } catch (e) {
        console.log(e)
        throw new Error(e.message)
    }
}

const createTokenService = async (body) => {
    try {
      body = {token: body}
      const result = await createToken(body);
      return result;
    } catch (e) {
      console.log(e);
      throw new Error(e.message);
    }
  };

const deleteTokenService = async (id) => {
    try{
        return await deleteToken(id)
    } catch (e) {
        console.log(e)
        throw new Error(e.message)
    }
}

module.exports = {getTokenService, deleteTokenService, createTokenService}