const { body } = require('express-validator')

module.exports = {
  movementSchema: [
    body('type')
      .isString()
      .trim()
      .withMessage('must be a string')
      .notEmpty()
      .withMessage('required'),
    body('concept')
      .isString()
      .trim()
      .withMessage('must be a string')
      .notEmpty()
      .withMessage('required'),
    body('amount')
      .isNumeric()
      .trim()
      .withMessage('must be a number')
      .notEmpty()
      .withMessage('required')
      .isFloat({ max: 9000000 }),
    body('date')
      .isISO8601()
      .trim()
      .withMessage('must be a date')
      .notEmpty()
      .withMessage('required'),
    body('category')
      .isString()
      .trim()
      .withMessage('must be a string')
      .notEmpty()
      .withMessage('required'),
  ],

}