const { ErrorObject } = require('../helpers/errorObject')
const httpStatus = require('../helpers/httpStatus')

const errorConverter = (err, req, res, next) => {
  let error = err
  if (!(error instanceof ErrorObject)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR

    let message
    if (process.env.NODE_ENV === 'development') {
      message = error.message || 'Internal server error'
    } else if (error.code) {
      message = error.code
    } else {
      message = error.statusCode === httpStatus.NOT_FOUND ? 'Not Found' : 'Internal server error'
    }
    error = new ErrorObject(statusCode, message)
  }
  next(error)
}

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const { statusCode, message, status } = err

  // res.locals.errorMessage = err.message

  const response = {
    code: statusCode,
    status: status || false,
    message,
  }

  res.status(statusCode).send(response)
}

module.exports = {
  errorConverter,
  errorHandler,
}
