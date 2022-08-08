const httpStatus = require('../helpers/httpStatus')
const { catchAsync } = require('../helpers/catchAsync')
const { endpointResponse } = require('../helpers/success')
const { createMovement, updateMovement, getMovementsByUser, getMovement, deleteMovement } = require('../services/movement')
const { decodeToken } = require('../middlewares/jwt')

module.exports = {
  create: catchAsync(async (req, res) => {
    const { concept, amount, date, category, type } = req.body
    const { id: userId } = decodeToken(req)
    const movement = await createMovement({ concept, amount, date, category, type, userId })
    endpointResponse({
      res,
      code: httpStatus.CREATED,
      status: true,
      message: 'Movement created',
      body: { movement },
    })
  }
  ),
  update: catchAsync(async (req, res) => {
    const movement = await updateMovement(req)
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'Movement updated',
      body: { movement },
    })
  },
  ),
  getById: catchAsync(async (req, res) => {
    const { id: userId } = decodeToken(req)
    const movement = await getMovement(req.params.id, userId)
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'Movement retrieved',
      body: { movement },
    })
  }
  ),
  getByUser: catchAsync(async (req, res) => {
    const { id: userId } = decodeToken(req)
    const movements = await getMovementsByUser(userId)
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'Movements retrieved',
      body: { movements },
    })
  }
  ),
  delete: catchAsync(async (req, res) => {
    const movement = await deleteMovement(req.params.id)
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'Movement deleted',
      body: { movement },
    })
  }
  ),
}