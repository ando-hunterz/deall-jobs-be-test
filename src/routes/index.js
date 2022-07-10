const express = require('express');
const { validate } = require('express-validation');

const { userSignIn, userSignOut, userRefresh} = require('../controllers/loginController');
const loginValidation = require('../validations/loginValidation');


const router = express.Router();

router.route('/login').post(validate(loginValidation, {statusCode: 422, keyByField: true}), userSignIn);

router.route('/refresh').post(userRefresh)

router.route('/signout').post(userSignOut)

module.exports = router;