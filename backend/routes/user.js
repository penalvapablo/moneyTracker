const router = require('express').Router()
const { auth } = require('../middlewares/auth')
const { validateSchema } = require('../middlewares/validateSchema')
const { userRegisterSchema } = require('../schemas/user')
const { } = require('../services/user')
const { post } = require('../controllers/user')

router.post('/register', /* validateSchema(userRegisterSchema), */ post)

module.exports = router