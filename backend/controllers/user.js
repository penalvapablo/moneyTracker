const httpStatus = require('../helpers/httpStatus')
const { catchAsync } = require('../helpers/catchAsync')
const { endpointResponse } = require('../helpers/success')
const { registerUser, getUserWithEmail, updateUser, deleteUser } = require('../services/user')

module.exports = {
  register: catchAsync(async (req, res, next) => {
    const userToken = await registerUser(req.body)
    endpointResponse({
      res,
      code: httpStatus.CREATED,
      status: true,
      message: 'User created',
      body: { userToken },
    })
  }),
  login: catchAsync(async (req, res) => {
    const { email, password } = req.body
    const { userWithoutPassword: user, token } = await getUserWithEmail({ email, password })
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'User logged in',
      body: { user, token },
    })
  }),
  update: catchAsync(async (req, res) => {
    const user = await updateUser(req)
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'User updated',
    })
  }),
  destroy: catchAsync(async (req, res) => {
    const { id } = req.params
    await deleteUser(id)
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'User deleted',
    })
  })

}