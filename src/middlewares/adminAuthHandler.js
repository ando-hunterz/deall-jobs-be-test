const { UnauthorizedError } = require('../utils/Error')
const { checkAdminToken, getToken } = require('../utils/jwt')

module.exports = (req, res, next) => {
    const jwttoken = getToken(req.headers['authorization'])
    checkAdminToken(jwttoken)
    next()
}