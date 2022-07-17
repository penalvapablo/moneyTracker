const router = require('express').Router()
const { auth } = require('../middlewares/auth')
const { validateSchema } = require('../middlewares/validateSchema')
const { userRegisterSchema, userLoginSchema } = require('../schemas/user')
const { register, login, update, destroy } = require('../controllers/user')

router.post('/register', validateSchema(userRegisterSchema), register)

router.post('/login', validateSchema(userLoginSchema), login)

router.put('/:id', auth, validateSchema(userRegisterSchema), update)

router.delete('/:id', auth, destroy)

module.exports = router