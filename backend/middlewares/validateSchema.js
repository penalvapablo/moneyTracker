const { validationResult } = require('express-validator')
const httpStatus = require('../helpers/httpStatus')
const { catchAsync } = require('../helpers/catchAsync')


module.exports = {
  validateSchema: (schema) => catchAsync(async (req, res, next) => {
    await Promise.all(schema.map((validation) => validation.run(req)))

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(httpStatus.BAD_REQUEST).json({
        code: httpStatus.BAD_REQUEST,
        status: false,
        errors: errors.array(),
      })
    }
    return next()
  }),
}
