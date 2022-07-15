const bcrypt = require('bcrypt')
const { User } = require('../database/models')
const { generateToken } = require('../middlewares/jwt')
const { ErrorObject } = require('../helpers/errorObject')

module.exports = {
  createUser: async (data) => {
    const {
      firstName, lastName, email, password,
    } = data
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(password, 12)
      },
    })
    if (!created) throw new ErrorObject(httpStatus.CONFLICT, 'Email already exists')
    const token = generateToken(user.dataValues)
    return token
  }
}