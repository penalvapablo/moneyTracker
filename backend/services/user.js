const bcrypt = require('bcrypt')
const { User } = require('../database/models')
const { generateToken } = require('../middlewares/jwt')
const { ErrorObject } = require('../helpers/errorObject')
const httpStatus = require('../helpers/httpStatus')

module.exports = {
  registerUser: async (data) => {
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
  },
  getUserWithEmail: async ({ email, password }) => {
    const user = await User.findOne({ where: { email } })
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new ErrorObject(httpStatus.UNAUTHORIZED, 'Invalid credentials')
    }
    const { password: passwordRemoved, updatedAt, deletedAt, ...userWithoutPassword } = user.dataValues
    const token = generateToken(userWithoutPassword)
    return { userWithoutPassword, token }
  }, updateUser: async (req) => {
    const {
      firstName, lastName, email, password,
    } = req.body
    const idUser = req.params.id
    const userExist = await User.findOne({ where: { id: idUser } })
    if (!userExist) {
      throw new ErrorObject(httpStatus.NOT_FOUND, 'User not found')
    }
    const result = await User.update(
      {
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(password, 12),
      },
      {
        where: { id: idUser },
      },
    )
    if (result[0] === 0) {
      throw new ErrorObject(httpStatus.NOT_FOUND, 'User not found')
    }
    return
  },
  deleteUser: async (id) => {
    const user = await User.destroy({
      where: { id },
    })
    if (user !== 1) throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
}