require('dotenv').config(); 

module.exports = {
    port: process.env.PORT,
    jwtsalt: process.env.JWT_SALT,
    jwtrefreshsalt: process.env.JWT_REFRESH_SALT,
    db_url: process.env.DB_URL
}