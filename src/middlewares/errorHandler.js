const { ValidationError } = require("express-validation");
const { MongooseNotFoundError, InvalidValueError, UnauthorizedError, MongooseFoundError} = require("../utils/Error");
module.exports = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    const formattedError = {
      statusCode: err.statusCode,
      message: err.message,
      details: err.details,
    };
    return res.status(err.statusCode).json(formattedError);
  } else if (err instanceof MongooseNotFoundError || err instanceof InvalidValueError || err instanceof UnauthorizedError || err instanceof MongooseFoundError) {
    const formattedError = {
      statusCode: err.statusCode,
      message: err.message,
    };
    return res.status(err.statusCode).json(formattedError);
  }
  return res.status(500).json(err);
};
