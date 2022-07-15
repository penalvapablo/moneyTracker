const httpStatus = require('../helpers/httpStatus')
const { validateToken } = require('./jwt')
const { ErrorObject } = require('../helpers/errorObject')
const { catchAsync } = require('../helpers/catchAsync')

module.exports = {
  auth: catchAsync(async (req, res, next) => {
    if (!req.headers.authorization) {
      throw new ErrorObject(httpStatus.UNAUTHORIZED, 'No authorization header')
    }
    if (validateToken(req)) next()
  }),
}
