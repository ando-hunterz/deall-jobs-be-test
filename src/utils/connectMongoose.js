const {db_url} = require('../config')

const connect = () => {
    const mongoose = require('mongoose');
    mongoose.connect(db_url).catch(err => {throw new Error(err)}); 
}

module.exports = connect