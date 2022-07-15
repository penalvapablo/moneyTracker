const express = require('express')
const { get } = require('../controllers/index')
const userRouter = require('./user')
const router = express.Router()

// user routes
router.use('/user', userRouter)

module.exports = router
