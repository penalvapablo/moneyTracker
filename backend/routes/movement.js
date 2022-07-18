const router = require('express').Router()
const { auth } = require('../middlewares/auth')
const { validateSchema } = require('../middlewares/validateSchema')
const { movementSchema } = require('../schemas/movement')
const { create, update, getByUser, getById, getAll, delete: deleteMovement } = require('../controllers/movement')

router.get('/', auth, getByUser)

router.get('/:id', auth, getById)

router.post('/', auth, validateSchema(movementSchema), create)

router.put('/:id', auth, validateSchema(movementSchema), update)

router.delete('/:id', auth, deleteMovement)

module.exports = router