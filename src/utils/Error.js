class MongooseNotFoundError extends Error {
  constructor(field, value) {
    const message = `No ${value} found on ${field}`;
    super(message);
    this.message = message;
    this.statusCode = 422;
    this.field = field
    this.value = value
  }
}

class MongooseFoundError extends Error {
  constructor(message) {
    super(message)
    this.message = message
    this.statusCode = 422
  }
}

class InvalidValueError extends Error {
  constructor(field) {
    const message = `Incorrect value on ${field}`;
    super(message);
    this.message = message;
    this.statusCode = 401;
  }
}

class UnauthorizedError extends Error {
  constructor(message = `Unauthorized Access`) {
    super(message);
    this.message = message;
    this.statusCode = 403;
  }
}

module.exports = {
  MongooseNotFoundError,
  InvalidValueError,
  UnauthorizedError,
  MongooseFoundError
};
