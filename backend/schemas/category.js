const { body } = require('express-validator')

module.exports = {
  categorySchema: [
    body('name')
      .isString()
      .trim()
      .withMessage('must be a string')
      .notEmpty()
      .withMessage('required'),
    body('type')
      .isString()
      .trim()
      .withMessage('must be a string')
      .notEmpty()
      .withMessage('required'),
  ],
}