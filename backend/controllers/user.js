const httpStatus = require('../helpers/httpStatus')
const { catchAsync } = require('../helpers/catchAsync')
const { endpointResponse } = require('../helpers/success')
const { createUser } = require('../services/user')

module.exports = {
  post: catchAsync(async (req, res, next) => {
    const userToken = await createUser(req.body)
    endpointResponse({
      res,
      code: httpStatus.CREATED,
      status: true,
      message: 'User created',
      body: { userToken },
    })
  })
}