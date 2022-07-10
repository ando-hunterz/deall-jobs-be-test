const express = require("express");
const { validate } = require("express-validation");

const authenticateMiddleware = require("../middlewares/authenticationHandler");
const adminAuthenticationMiddleware = require("../middlewares/adminAuthHandler");
const adminGuardMiddleware = require('../middlewares/adminGuardHandler')
const onlyUserMiddleware = require("../middlewares/onlyUserHandler");
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");
const userValidation = require("../validations/userValidation");
const userUpdateValidation = require("../validations/userUpdateValidationn");

const userRoute = express.Router();

userRoute.use(authenticateMiddleware);

userRoute.get("/", adminAuthenticationMiddleware, getAllUsers);

userRoute.get("/:id", onlyUserMiddleware, getUser);

userRoute.post(
  "/",
  [
    validate(userValidation, { statusCode: 422, keyByField: true }),
    adminAuthenticationMiddleware,
  ],
  createUser
);

userRoute.put(
  "/:id",
  [
    validate(userValidation, { statusCode: 422, keyByField: true }),
    adminAuthenticationMiddleware,
    adminGuardMiddleware
  ],
  updateUser
);

userRoute.patch(
  "/:id",
  [
    validate(userUpdateValidation, { statusCode: 422, keyByField: true }),
    adminAuthenticationMiddleware,
    adminGuardMiddleware
  ],
  updateUser
);

userRoute.delete("/:id", [adminAuthenticationMiddleware, adminGuardMiddleware], deleteUser);

module.exports = userRoute;
