const { body } = require('express-validator')

module.exports = {
  categorySchema: [
    body('name')
      .isString()
      .trim()
      .withMessage('must be a string')
      .notEmpty()
      .withMessage('required'),
    body('typeId')
      .isInt()
      .trim()
      .withMessage('must be an integer')
      .notEmpty()
      .withMessage('required'),
  ],
}